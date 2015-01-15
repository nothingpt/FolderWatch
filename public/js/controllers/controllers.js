"use strict";

var myControllers = angular.module('fileWatcherApp.controllers',[]);

myControllers.controller('filesCTRL',function($scope,socket){
    $scope.numFiles = 0;
    $scope.files = [];

    var init = function () {
        socket.emit('initial', function () {
        })
    }
    init();

    // Socket listeners
    socket.on('filesAdded', function (data) {
        $scope.numFiles = data.total;
        $scope.files = [];
        $scope.date = data.uDate;
        for(var i = 0;i<$scope.numFiles;i++){
            $scope.files.push({name:data.files[i]});
        }
    });
    socket.on('filesRemoved', function (data) {
        $scope.numFiles = data.total;
        $scope.files = [];
        $scope.date = data.uDate;
        for(var i = 0;i<$scope.numFiles;i++){
            $scope.files.push({name:data.files[i]});
        }
    });
    socket.on('initialResponse', function (data) {
        $scope.numFiles = data.total;
        $scope.date = data.uDate;
        $scope.files = [];
        for(var i = 0;i<$scope.numFiles;i++){
            $scope.files.push({name:data.files[i]});
        }
    });
});