angular.module('main',[])
.controller('mainController', ['$scope', '$http', function($scope, $http){
	alert('controller hits');
	$scope.test = {tester:'this is a test'}

}])