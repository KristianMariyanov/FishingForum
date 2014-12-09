require(['modules/headersWithSession'], function (headers) { //TODO: Check if we need session Token or not and fix it
    $(document).ready(function () {
        headers;

        //Actual User Profile Retrieving
        // TODO: fix user button class/ id
        $(".userBtn").on('click', function (e) {
            e.preventDefault();
            var userId = ?
            retrieveUserInfo(userId);
        });

        function retrieveUserInfo(userId) {
            $.ajax({
                method: "GET",
                url: 'https://api.parse.com/1/login?username=' + username + '&password=' + pass,
                contentType: "application/json",
                data: null,
                success: function (data) {
                    //for test purposes
                    console.log(JSON.stringify(data));
                    document.cookie = "sessionToken=" + data.sessionToken;
                    localStorage.setItem("loggedUserId", data.objectId);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    })
})



retrieveUserInfo(); //username, firstName, lastName, image, rating, aboutMe, answers, questions w paging, email

