function logOut(){
    document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    localStorage.removeItem("sessionToken");
}

function getUserByObjectId(objectId){
    $.ajax({
        method: "GET",
        url: 'https://api.parse.com/1/classes/_User/' + objectId,
        success: function(data){
            console.log(data);
        },
        error: errorReport
    });
}

function getTags(){
    var tags = [];
    $.ajax({
        method: "GET",
        async:false,
        url: 'https://api.parse.com/1/classes/tag/',
        success: function(data){
            data.results.forEach(function(item){
                tags.push({"name": item.title, "objectId":item.objectId, "counter": item.counter});
            });
            return (tags);
        },
        error: errorReport
    });
    return tags;
}

function getTagByObjectId(objectId){
    $.ajax({
        method: "GET",
        url: 'https://api.parse.com/1/classes/tag/' + objectId,
        success: function(data){
            console.log(data);
        },
        error: errorReport
    });
}

function getTagsByPopularity(){
    var tags = [];
    $.ajax({
        method: "GET",
        async:false,
        url: 'https://api.parse.com/1/classes/tag/?order=-counter,title',
        success: function(data){
            data.results.forEach(function(item){
                tags.push({"name": item.title, "objectId":item.objectId, "counter": item.counter});
            });
            return (tags);
        },
        error: errorReport
    });
    return tags;
}





