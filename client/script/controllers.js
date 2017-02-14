var app = angular.module('app', []);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


app.service('fileUpload', ['$http', function ($https) {
    this.uploadFileToUrl = function(file, formData, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        fd.append('fields', JSON.stringify(formData));
        console.log("asd" , fd);
        $https.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
    }
}]);


app.controller('myCtrl', ['$scope', 'fileUpload', function($scope,fileUpload){
    $scope.user = {};
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "http://0.0.0.0:3000/api/people/profileData";
        fileUpload.uploadFileToUrl(file, $scope.user, uploadUrl);
    };
}]);