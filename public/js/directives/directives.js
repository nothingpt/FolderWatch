"use strict";

var myDirectives = angular.module('fileWatcherApp.directives',[])
.directive('files', function () {
        return{
            restrict:'E',            
            templateUrl: 'templates/file.html',
            link: function (scope, element, attrs) {
                scope.numFiles = scope.numFiles;
                scope.$watch('numFiles', function (newValue,oldValue) {
                    //alert(scope.title);
                    if(newValue){
                        scope.numFiles = newValue;
                        if(newValue>oldValue){
                            $().toastmessage('showNoticeToast',"File added");
                        } else {
                            $().toastmessage('showErrorToast',"File removed");
                        }
                    }
                })
            }
        }
    })