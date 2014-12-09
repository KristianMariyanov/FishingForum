require(['modules/headersNoSession'], function (headers) {
    $(document).ready(function () {
        headers;

//        var formRegister = $('#registerForm');
//        formRegister.submit(registerUser);

        $("#registerForm").click(function() {
            debugger;
            var username = $("#username").val();
            var password = $("#password").val();
            var email = $("#email").val();
            var firstName = $("#firstName").val();
            var lastName = $("#lastName").val();
            var aboutMe = $("#aboutMe").val();

            var createdUserId = "";

            $.ajax({
                method: "POST",
                url: 'https://api.parse.com/1/users',
                contentType: "application/json",
                data: JSON.stringify({
                    "username": username,
                    "password": password,
                    "firstName": firstName,
                    "lastName": lastName,
                    "rating": 0,
                    "email": email,
                    "aboutMe": aboutMe
                }),
                success: function (data) {
                    setRole(data);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        })

        function setRole(data) {
            $.support.cors = true;
            $.ajax({
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify({
                    "users": {
                        "__op": "AddRelation",
                        "objects": [
                            {   "__type": "Pointer",
                                "className": "_User",
                                "objectId": data.objectId
                            }
                        ]
                    }}),
                url: 'https://api.parse.com/1/classes/_Role/fMLotQQa9j',
                success: function (data) {
                    $('#forum-panel').html('<h1>Successfully Registration</h1>');
                    window.location.href = '#/login';
                },
                error: function (err) {
                    console.log("Fail!!!! --");
                    console.log(err);
                }
            });
        }
    })
})
