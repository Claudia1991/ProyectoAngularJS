var app = angular.module("myApp", ['ngDialog', 'ngMessages', 'ngRoute'])

app.config(function($routeProvider){
    $routeProvider
    .when('/', {templateUrl:'login.html', controller:'loginController'})
    .otherwise({template:'Hay un error.'})
})

app.controller("myAppController", function($scope, ngDialog){
    $scope.listaEmpleados = empleados;
    $scope.empleado = {};

    //Funcion que quita un empleado de la tabla
    $scope.quitarEmpleado = function(posicion){
        $scope.listaEmpleados.splice(posicion,1);
    };

    //Funcion que muestra el formulario para editar un empleado
    $scope.editarEmpleado = function(){
        $scope.listaEmpleados = $scope.listaEmpleados.map(function(empleado){
            return (empleado.dni === $scope.empleado.dni) ? $scope.empleado : empleado ;
        })
        ngDialog.close()
    }

    $scope.showForm = function(empleado){
        $scope.empleado = angular.copy(empleado);
        ngDialog.open({
            templateUrl: 'editarEmpleado.html',
            scope: $scope,
        })
    }

    //Funcion que cuenta cuantos empleados recibieron entrenamiento
    $scope.contarEmpleados = function(){
        var cantidadEmpleados = 0;
        angular.forEach($scope.listaEmpleados, function(empleado){
            cantidadEmpleados += empleado.coaching == true
        });
        return cantidadEmpleados;
    };

    //Funcion para ordenar la tabla de forma dinamica
    $scope.ordenar = function(informacion){
        $scope.orden = informacion;
    }

    //Funcion para agregar un empleado a la tabla
    $scope.agregarEmpleado = function(empleadoNuevo){
        //$scope.listaEmpleados.push(angular.copy($scope.nuevoEmpleado));
        $scope.listaEmpleados = empleados;
        $scope.listaEmpleados.push((empleadoNuevo));
        $scope.nuevoEmpleado = {};
    };
})

//DIRECTIVAS
//Directiva de expresion regular DNI
app.directive('dni', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.dni = function (mv, vw) {
            if (ctrl.$isEmpty(mv)) {
                return false;
            }
      
            if (/^\d{6,7}$/.test(vw)) {
                elm.css({color: 'green'})
                return true;
            }
      
            elm.css({color: 'red'})
            return false
        }
        }
    };
});