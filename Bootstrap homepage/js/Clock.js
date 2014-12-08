function timeDate() {
    var currTime = new Date();

    var currHours = currTime.getHours();
    var currMinutes = currTime.getMinutes();
    var currSeconds = currTime.getSeconds();

    currMinutes = (currMinutes < 10 ? "0" : "") + currMinutes;
    currSeconds = (currSeconds < 10 ? "0" : "") + currSeconds;

    var timeOfDay = (currHours < 12) ? "AM" : "PM";
    currHours = (currHours > 12) ? currHours - 12 : currHours;
    currHours = (currHours == 0) ? 12 : currHours;

    var currTimeString = currHours + ":" + currMinutes + ":" + currSeconds + " " + timeOfDay;

	var date = currTime.getDate();
    var day = currTime.getDay();
    var month = currTime.getMonth()+1;
    var year = currTime.getFullYear();

    var timeDateString=getDay(day)+", "+date+" "+getMonth(month-1)+" "+year+" - "+currTimeString;
	$("#sub-right").html(timeDateString+"<br />"+"Moon Phase: "+getLatinName(currTime)+"<br />"+
	"Distance from Earth: "+calcMDist(currTime)+"<br />"+"Moon Age: "+calcMAge(currTime)+" days");
	
    function getMonth(month) {
        var currMonth = new Array();
			currMonth[0] = "January";
			currMonth[1] = "February";
			currMonth[2] = "March";
			currMonth[3] = "April";
			currMonth[4] = "May";
			currMonth[5] = "June";
			currMonth[6] = "July";
			currMonth[7] = "August";
			currMonth[8] = "September";
			currMonth[9] = "October";
			currMonth[10] = "November";
			currMonth[11] = "December";
			var n = currMonth[month];
			return n;
    }
	function getDay(day){
		var currDay=new Array();
		currDay=["Mon","Tue","Wed","Thur","Fri","Sat","Sun"];
		var d=currDay[day];
		return d;
	}
    return currTime;
}