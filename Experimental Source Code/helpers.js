$.ajaxSetup({
    headers: {
        "X-Parse-Application-Id": "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco",
        "X-Parse-REST-API-Key": "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb",
        "X-Parse-Session-Token": getCookie("sessionToken")
    }
});

function createPost(title, content, status, category){
    var resultData;
    $.ajax({
        method: "POST",
        async: false,
        url: 'https://api.parse.com/1/classes/question',
        contentType: "application/json",
        data: JSON.stringify({
            "title":title,
            "content":content,
            "status":{
                "__type":"Pointer",
                "className":"QuestionRole",
                "objectId":"JOnNcZIoSE"
            },
            "category":
            {
                "__type":"Pointer",
                "className":"category",
                "objectId":status
            },
            "author":
            {
                "__type":"Pointer",
                "className":"_User",
                "objectId":localStorage.getItem("loggedUserId")
            },
            "rating":0,
            "viewCounter":0
        }),
        success: function(data){
            resultData = data;
            console.log(data)
        },
        error: function(err){
            console.log(err);
        }
    });
    return resultData;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function createTag(name){
    var res;
    $.ajax({
        method: "POST",
        async:false,
        url: 'https://api.parse.com/1/classes/tag',
        contentType: "application/json",
        data: JSON.stringify({
            "title":name,
            "counter":0
        }),
        success: function(data) {
            res = data.objectId;
        },
        error: errorReport
    });
    return res;
}

function logIn(username, pass){
    $.ajax({
        method: "GET",
        url: 'https://api.parse.com/1/login?username=' + username + '&password=' + pass,
        contentType: "application/json",
        data: null,
        success: function(data){
            console.log(JSON.stringify(data));
            document.cookie = "sessionToken=" + data.sessionToken;
            localStorage.setItem("loggedUserId", data.objectId);
        },
        error: function(err){
            console.log(err);
        }
    });
}

function logOut(){
    document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    localStorage.removeItem("sessionToken");
}

function registerUser(){
    var username= $("#username").val();
    var password= $("#password").val();
    var email= $("#email").val();
    var firstName = $("#firstName").val();
    var lastName= $("#lastName").val();
    var aboutMe= $("#aboutMe").val();

    var createdUserId = "";

    $.ajax({
        method: "POST",
        url: 'https://api.parse.com/1/users',
        contentType: "application/json",
        data: JSON.stringify({
            "username":username,
            "password":password,
            "firstName": firstName,
            "lastName":lastName,
            "rating":0,
            "email":email,
            "aboutMe":aboutMe
        }),
        success: function(data){
            setRole(data);
        },
        error: function(err){
            console.log(err);
        }
    });
}

function setRole(data){
    $.support.cors = true;
    $.ajax({
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            "users":
            {
                "__op":"AddRelation",
                "objects":[
                    {   "__type":"Pointer",
                        "className":"_User",
                        "objectId":data.objectId
                    }]
            }}),
        url: 'https://api.parse.com/1/classes/_Role/fMLotQQa9j',
        success: function(data){
            console.log('Successfully assigned a role!');
        },
        error: function(err){
            console.log("Fail!!!! --");
            console.log(err);
        }
    });
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

function getCategories(){
    var categories = [];
    $.ajax({
        method: "GET",
        async:false,
        url: 'https://api.parse.com/1/classes/category/',
        success: function(data){
            data.results.forEach(function(category){
                categories.push({"name": category.name, "objectId":category.objectId});
            });
            return (categories);
        },
        error: errorReport
    });
    return categories;
}

function getTags(){
    var tags = [];
    $.ajax({
        method: "GET",
        async:false,
        url: 'https://api.parse.com/1/classes/tag/',
        success: function(data){
            data.results.forEach(function(item){
                tags.push({"name": item.title, "objectId":item.objectId});
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

function getTagByName(name){
    var tags = [];
    $.ajax({
        method: "GET",
        async:false,
        url: encodeURI('https://api.parse.com/1/classes/tag/?where={"title":"' + name + '"}'),
        success: function(data){
            data.results.forEach(function(item){
                tags.push({"name": item.title, "objectId":item.objectId});
            });
            return (tags);
        },
        error: errorReport
    });
    return tags;
}

function createTagMeta(tagId, postId){
    $.ajax({
        method: "POST",
        url: 'https://api.parse.com/1/classes/tagsMeta',
        contentType: "application/json",
        data: JSON.stringify({
            "question":{
                "__type":"Pointer",
                "className":"question",
                "objectId":postId
            },
            "tag":{
                "__type":"Pointer",
                "className":"tag",
                "objectId":tagId
            }
        }),
        error: errorReport
    });
}

function errorReport(err){
    console.log(err);
}