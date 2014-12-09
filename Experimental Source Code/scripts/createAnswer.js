require(['modules/headersWithSession'], function (headers) {
    $(document).ready(function(){
        headers;

//Actual Post Creating
        var createdPostData;
        $( "#answerForm" ).submit(function(e) {
            e.preventDefault();
            var link = window.location.href.split('/');
            var questionId = link[link.length - 2];
            var content = $("#answerContent").val();

//            createdPostData = createPost(title, content, status, category);
            createAnswer("OeXJEO1qaa", content);

        });

        function createAnswer(questionId, content){
            var resultData;
            var userId = localStorage.getItem("loggedUserId");
            $.ajax({
                method: "POST",
                async: false,
                url: 'https://api.parse.com/1/classes/answer',
                contentType: "application/json",
                data: JSON.stringify({
                    "content":content,
                    "author":{
                        __type:"Pointer",
                        "className":"_User",
                        "objectId": userId
                    },
                    "question":
                    {
                        "__type":"Pointer",
                        "className":"question",
                        "objectId": questionId
                    },
                    "rating":0,
                    "ALC":{ /// Only the user creating this can edit it. The others can only read it.
                        userId: {
                            "read": true,
                            "write": true
                        },
                        "*": {
                            "read": true
                        }
                    }
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
    })
})




