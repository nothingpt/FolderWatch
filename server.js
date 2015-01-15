var express = require('express'),
    chokidar = require('chokidar'),
    moment = require('moment'),
    q = require('q');
fs = require('fs'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    folder = "C:\\temp\\folderWatch",
    watcher = chokidar.watch(folder,{ignored: /[\/\\]\./,persistent:true,interval:1000});

server.listen(9001, function () {
    console.log('Server started at :9001');
})

app.use('/',express.static(__dirname+'/public'));
app.use('/scripts',express.static(__dirname+'/node_modules'));
// tipo api
app.use('/inicial', function (req, res) {
    fs_readdir = q.denodeify(fs.readdir),
        promise = fs_readdir(folder);

    promise.then(function (data) {
        res.send(data.length);
    })
})

watcher
    .on('add', function (path) {
        var total = 0,
            fs_readdir = q.denodeify(fs.readdir),
            promise = fs_readdir(folder),
            date = moment()._d;

        promise.then(function (data) {
            total = data.length;
            var date = moment()._d;
            console.log(total);
            // data da última alteração
            io.sockets.emit('filesAdded',{
                message:'File(s) Added',
                total:total,
                uDate: date,
                files:data
            });
        });
    })
    .on('unlink', function (path) {
        var total = 0;
        var fs_readdir = q.denodeify(fs.readdir);
        var promise = fs_readdir(folder);
        promise.then(function (data) {
            var date = moment()._d;
            total = data.length;
            io.sockets.emit('filesRemoved',{
                message:'File(s) Removed',
                total:total,
                uDate:date,
                files:data
            });
        });
    })

io.on('connection', function (socket) {
    console.log("client connected");
    socket.on('initial', function (data) {
        fs_readdir = q.denodeify(fs.readdir),
            promise = fs_readdir(folder);

        promise.then(function (data) {
            io.sockets.emit('initialResponse',{
                total:data.length,
                uDate:moment()._d,
                files:data
            });
        })
    })
})