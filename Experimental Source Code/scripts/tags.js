require(['config'], function (headers) {
    $(document).ready(function () {
        headers;

//        $('#test').html(message);

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

        $("#createTagBtn").on("click", function() {
            createTag($("#tagName").val());
        });

        function createTag(name){
            var res;
            $.ajax({
                method: "POST",
                async:false,
                url: 'https://api.parse.com/1/classes/tag',
                contentType: "application/json",
                data: JSON.stringify({
                    "title":name,
                    "counter":1
                }),
                success: function(data) {
                    res = data.objectId;
                },
                error: errorReport
            });
            return res;
        }

        function errorReport(err){
            console.log(err);
        }
    })
})

//$(document).ready(function () {
//    $.ajaxSetup({
//        headers: {
//            "X-Parse-Application-Id": "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco",
//            "X-Parse-REST-API-Key": "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb",
////            "X-Parse-Session-Token": getCookie("sessionToken")
//            //hardcoded session token for test purposes
//            "X-Parse-Session-Token": "5nDqDCwPfMpZEUAs7wQKJJvTm"
//        }
//    });
//
//    function getCookie(cname) {
//        var name = cname + "=";
//        var ca = document.cookie.split(';');
//        for(var i=0; i<ca.length; i++) {
//            var c = ca[i];
//            while (c.charAt(0)==' ') c = c.substring(1);
//            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
//        }
//        return "";
//    }
//
//    $("#createTagBtn").on("click", function() {
//        createTag($("#tagName").val());
//    });
//
//    function createTag(name){
//        var res;
//        $.ajax({
//            method: "POST",
//            async:false,
//            url: 'https://api.parse.com/1/classes/tag',
//            contentType: "application/json",
//            data: JSON.stringify({
//                "title":name,
//                "counter":1
//            }),
//            success: function(data) {
//                res = data.objectId;
//            },
//            error: errorReport
//        });
//        return res;
//    }
//
//    function errorReport(err){
//        console.log(err);
//    }
//})
