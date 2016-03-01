/**
 * Created by C-Styles on 2/27/16.
 */

//@usage: foo = Calendar(2016, 3)  -> [ { field: '3/6 Sunday' } ....]
//@params: 4 digit year, month(1-12)
function gridMonthHeader(year, month) {
	var elem = [];
	var mon = month - 1
	var d = new Date(year, mon)
	var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	while(d.getMonth() == mon) {
		elem.push({field:(mon+1) + '/' + d.getDate(),name:(mon+1) + '/' + d.getDate() + ' ' + dayName[d.getDay()]})
		d.setDate(d.getDate()+1)
	}
	return elem;
}
function dateNowTest(){
	var now = Date.now()
	var d = new Date(now)

	console.log ('d.getFullYear()');console.log ( d.getFullYear() ); //marker
	console.log ('d.getMonth()');console.log ( d.getMonth() ); //marker
}
//console.log ('gridMonthHeader(2016, 2)');console.log ( gridMonthHeader(2016, 3) ); //marker

dateNowTest()


