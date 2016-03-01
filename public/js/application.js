
	angular.module('main',['ngTouch', 'ui.grid', 'ui.grid.pinning'])
.factory("flexDate", [function(){
   var O = {}
	 var now = Date.now()
	var d = new Date(now)
	 d.setDate(1)
	var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	O.gridMonthHeader = function() {
		var elem = [{name:'Room', field:'roomNumber', pinnedLeft:true, width:100 }];
		var mon = d.getMonth()
		while(d.getMonth() == mon) {
			elem.push({field:(mon+1) + ' / ' + d.getDate(),name:(mon+1) + ' / ' + d.getDate() + '  ' + dayName[d.getDay()] + ' ', cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
					var reg = /(friday) | (saturday)/i;
					var found = col.name.match(reg);
					if(found){
						return 'blue'
					}
				},year: d.getFullYear(),
				width:100
			})
			d.setDate(d.getDate()+1)
		}
		d.setDate(1)
		d.setMonth(mon)
		//console.log ('elem');console.log ( elem ); //marker
		return elem;
	}
	 O.shiftMonth = function(direction){
		 var month = d.getMonth()
		 direction == 'left' ? d.setMonth(month - 1) : d.setMonth(month + 1)
		  return this.gridMonthHeader()
	 }

	 return O;
}])
.factory("gridHelp", ['flexDate',function(flexDate){
	var O = {}
	O.getGridOptions = function(){
		return {
    enableSorting: true,
    columnDefs: flexDate.gridMonthHeader(),
    onRegisterApi: function( gridApi ) {
      this.gridApi = gridApi;
    }
  }
	}
	O.shiftMonth = function(direction){
		return flexDate.shiftMonth(direction)
	}
return O;
}])
.controller('mainController', ['gridHelp','$scope', '$http', function(gridHelp, $scope, $http){
	$scope.gridOptions = gridHelp.getGridOptions();

	$scope.shiftMonth = function(direction){
		$scope.gridOptions.columnDefs = gridHelp.shiftMonth(direction)
	}

  $scope.gridOptions.data = [{roomNumber: 1 , '2 / 1': 'booked 1'},{roomNumber: 2 , '2 / 1': 'booked 2'},{roomNumber: 3 , '2 / 1': 'booked 3'}];

}]);


