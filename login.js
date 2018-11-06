var app = angular.module('miApp', [])
app.controller('loginController', function($scope, $http, $window)
{
    $scope.Ingresar = function(){
        var user = $scope.username;
        var password = $scope.password;

        $http
        ({
            url:'login.php',
            method:'post',
            headers:{
                'Content-type':'application/x-www-fotm-urlencoded'
            },
            data:'username='+user+'&password='+password
        }).then(function(response){
            if(response.data.status == 'loggedin'){
                $window.location.href='index.html'
            }else{
                $window.location.href='error.html'
            }
        })
    }
})