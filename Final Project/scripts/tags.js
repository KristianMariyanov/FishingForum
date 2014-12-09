require(['modules/headersWithSession'], function (headers) {
    $(document).ready(function () {
        headers;

        $("#tagForm").submit(function(e) {
            e.preventDefault();
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