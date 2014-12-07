require(['modules/headersWithSession'], function (headers) {
    $(document).ready(function(){
        headers;
		
		$("#getPostByIdBtn").on('click', function(){
			var postId = $("#postId").val();
			getPost(postId);
		});

        function getPost(id){
            var resultData;
            $.ajax({
                method: "GET",
                async: false,
                url: 'https://api.parse.com/1/classes/question/' + id,
                success: function(data){
                    resultData = data;
                    console.log(data);
					updatePostViewCounter(id, (data.viewCounter+1));
					
					// Remove the line bellow. It's just to demonstrate the functionallity.
					$("body").append("<h3>Current views: " + (data.viewCounter + 1) + "</h3>")
                },
                error: errorReport
            });
            return resultData;
        }
		
		function updatePostViewCounter(id, updatedViews){
			$.ajax({
				method: "PUT",
				url: 'https://api.parse.com/1/classes/question/' + id,
				contentType: "application/json",
                data: JSON.stringify({
                    "viewCounter":updatedViews
                }),
				success: function(data){
					resultData = data;
					console.log(data)
				},
				error: errorReport
			});
		}

        function errorReport(err){
            console.log(err);
        }
    })
})




