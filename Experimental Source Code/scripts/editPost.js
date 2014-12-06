require(['modules/headersWithSession'], function (headers) {
    $(document).ready(function(){
        headers;

        $("#editPostBtn").on("click", function(){
            // O0MunljOvK - Some question ID. Replace with variable
            //  for dynamic functionality.
            editPost("O0MunljOvK", $("#newPostContent").val());
        });

        //Actual Post Editing
        function editPost(id, content){
            var resultData;
            $.ajax({
                method: "PUT",
                async: false,
                url: 'https://api.parse.com/1/classes/question/' + id,
                contentType: "application/json",
                data: JSON.stringify({
                    "content":content
                }),
                success: function(data){
                    resultData = data;
                    console.log(data)
                },
                error: errorReport
            });
            return resultData;
        }

        function errorReport(err){
            console.log(err);
        }
    })
})




