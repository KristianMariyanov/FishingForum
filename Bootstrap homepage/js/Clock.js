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

    var dateString = [];
    var date = currTime.getDate();
    var day = currTime.getDay();
    var month = currTime.getMonth()+1;
    var year = currTime.getFullYear();

    dateString.push(date);
    dateString.push(day);
    dateString.push(month);
    dateString.push(year);
    
    $("#clock").text(currTimeString);
    function getDay(date) {
        var currDay;
        switch (date) {
            case 0: currDay = "Sunday";
                break;
            case 1: currDay = "Monday";
                break;
            case 2: currDay = "Tuesday";
                break;
            case 3: currDay = "Wednesday";
                break;
            case 4: currDay = "Thursday";
                break;
            case 5: currDay = "Friday";
                break;
            case 6: currDay = "Saturday";
                break;
        }
        return currDay;
    }
    function getMonth(month) {
        var currMonth;
        switch (month) {
            case 0: currMonth = "January";
                break;
            case 1: currMonth = "February";
                break;
            case 2: currMonth = "March";
                break;
            case 3: currMonth = "April";
                break;
            case 4: currMonth = "May";
                break;
            case 5: currMonth = "June";
                break;
            case 6: currMonth = "July";
                break;
            case 7: currMonth = "August";
                break;
            case 8: currMonth = "September";
                break;
            case 9: currMonth = "October";
                break;
            case 10: currMonth = "November";
                break;
            case 11: currMonth = "December";
                break;

        }
        return currMonth;
    }
    return currTime;
}