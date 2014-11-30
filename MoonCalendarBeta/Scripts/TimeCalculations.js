function CurrTime() {
    var currDate = new Date();
    var dateAttr = [];
    dateAttr.push(currDate.getFullYear());
    dateAttr.push(currDate.getMonth());
    dateAttr.push(currDate.getDate());
    dateAttr.push(currDate);
    return dateAttr;
};
