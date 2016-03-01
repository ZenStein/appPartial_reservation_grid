//function gridMonthHeader(yearMonth) {
//	var elem = [];
//	var mon = yearMonth.month - 1
//	var d = new Date(yearMonth.year, mon)
//	var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//	while(d.getMonth() == mon) {
//		elem.push({field:(mon+1) + ' / ' + d.getDate(),name:(mon+1) + ' / ' + d.getDate() + '  ' + dayName[d.getDay()] + ' ', cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
//				var reg = /(friday) | (saturday)/i;
//				var found = col.name.match(reg);
//				if(found){
//					return 'blue'
//				}
//			},year: d.getFullYear()
//		})
//		d.setDate(d.getDate()+1)
//	}
//	console.log ('elem');console.log ( elem ); //marker
//	return elem;
//}


angular.module('main',['ui.grid'])
.factory("flexDate", [function(){
   var O = {}
	 var now = Date.now()
	var d = new Date(now)
	 d.setDate(1)
	var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	O.gridMonthHeader = function() {
		var elem = [];
		var mon = d.getMonth()
		while(d.getMonth() == mon) {
			elem.push({field:(mon+1) + ' / ' + d.getDate(),name:(mon+1) + ' / ' + d.getDate() + '  ' + dayName[d.getDay()] + ' ', cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
					var reg = /(friday) | (saturday)/i;
					var found = col.name.match(reg);
					if(found){
						return 'blue'
					}
				},year: d.getFullYear()
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

  $scope.gridOptions.data = [{'2 / 1': 'this is a test'}];

}]);


