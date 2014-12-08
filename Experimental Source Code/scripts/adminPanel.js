require(['modules/headersWithSession'], function (headers) {
    $(document).ready(function(){
        headers;

        $("#loadAllQuestionsBtn").on("click", function(){
            renderAllQuestions(getAllQuestions());
        });

        $("#loadAllQCategoriesBtn").on("click", function(){
            renderAllCategories(getAllCategories());
        });

        $("#loadAllTagsBtn").on("click", function(){
            renderAllTags(getAllTags());
        });

        //Actual Post Editing
        function getAllQuestions(){
            var resultData;
            $.ajax({
                method: "GET",
                async: false,
                url: 'https://api.parse.com/1/classes/question/',
                success: function(data){
                    resultData = data.results;
                },
                error: errorReport
            });
            return resultData;
        }

        function getAllCategories(){
            var resultData;
            $.ajax({
                method: "GET",
                async: false,
                url: 'https://api.parse.com/1/classes/category/',
                success: function(data){
                    resultData = data.results;
                },
                error: errorReport
            });
            return resultData;
        }

        function getAllTags(){
            var resultData;
            $.ajax({
                method: "GET",
                async: false,
                url: 'https://api.parse.com/1/classes/tag/',
                success: function(data){
                    resultData = data.results;
                    //console.log(data)
                },
                error: errorReport
            });
            return resultData;
        }

        function renderAllQuestions(questions){
            $(".editor").remove();
            clearQuestionTable();
            questions.forEach(function(item){
                $("#questionTable").append("" +
                    "<tr><td>" + item.objectId + "</td><td id='questionTitle" + item.objectId + "'>" + item.title + "</td><td style='overflow: hidden; width: 200px; height: 40px;' id='questionContent" + item.objectId +"'>" + item.content + "</td><td>" +
                    "<a href='#' id='delete-" + item.objectId + "'>Delete</a> " +
                    "<a href='#' id='edit-" + item.objectId + "'>Edit</a>" +
                    "</td></tr>" +
                    "");

                $("#delete-" + item.objectId).on("click", function(){
                    deleteQuestion(item.objectId);
                });

                $("#edit-" + item.objectId).on("click", function(){
                    editQuestion(item.objectId);
                });
            });
            showQuestions();
        }

        function renderAllCategories(categories){
            $(".editor").remove();
            clearCategoryTable();
            categories.forEach(function(item){
                $("#categoriesTable").append("" +
                    "<tr><td>" + item.objectId + "</td><td>" + item.name + "</td><td>" + item.questionCount + "</td><td>" +
                    "<a href='#' id='delete-" + item.objectId + "'>Delete</a> " +
                    "</td></tr>" +
                    "");

                $("#delete-" + item.objectId).on("click", function(){
                    deleteCategory(item.objectId);
                });

                $("#edti-" + item.objectId).on("click", function(){
                    //editCategory(item.objectId); TODO
                });
            });
            showCategories();
        }

        function renderAllTags(tags){
            $(".editor").remove();
            clearTagsTable();
            tags.forEach(function(item){
                $("#tagsTable").append("" +
                    "<tr><td>" + item.objectId + "</td><td>" + item.title + "</td><td>" + item.counter + "</td><td>" +
                    "<a href='#' id='delete-" + item.objectId + "'>Delete</a> " +
                    "</td></tr>" +
                    "");

                $("#delete-" + item.objectId).on("click", function(){
                    deleteTag(item.objectId);
                });

                $("#edti-" + item.objectId).on("click", function(){
                    //editCategory(item.objectId); TODO
                });
            });
            showTags();
        }

        function deleteQuestion(id){
            var sure = confirm("Are you sure that you want to delete the question?");
            if (sure){
                $.ajax({
                    method: 'DELETE',
                    url: 'https://api.parse.com/1/classes/question/' + id,
                    success: function(){
                        renderAllQuestions(getAllQuestions());
                    },
                    error: errorReport
                });
            }
        }

        function deleteCategory(id){
            var sure = confirm("Are you sure that you want to delete the category?");
            if (sure){
                $.ajax({
                    method: 'DELETE',
                    url: 'https://api.parse.com/1/classes/category/' + id,
                    success: function(){
                        renderAllCategories(getAllCategories());
                    },
                    error: errorReport
                });
            }
        }

        function deleteTag(id){
            var sure = confirm("Are you sure that you want to delete this tag?");
            if (sure){
                $.ajax({
                    method: 'DELETE',
                    url: 'https://api.parse.com/1/classes/tag/' + id,
                    success: function(){
                        renderAllTags(getAllTags());
                    },
                    error: errorReport
                });
            }
        }

        function editQuestion(id){
            $(".editor").remove();
            $("body").append("" +
                "<div class='editor'><input type='text' id='newQuestionTitle' class='editInputText'>" +
                "<textarea id='newQuestionContent' class='editTextArea'></textarea>" +
                "<button id='editQuestion' class='editBtn'>Edit</button></div>");


            $("#newQuestionTitle").val($("#questionTitle" + id).text());
            $("#newQuestionContent").text($("#questionContent" + id).text());

            $("#editQuestion").on("click", function(){
                edit(id, $("#newQuestionTitle").val(), $("#newQuestionContent").val());
            });

            function edit(id, title, content){
                $.ajax({
                    method: 'PUT',
                    url: 'https://api.parse.com/1/classes/question/' + id,
                    contentType: "application/json",
                    data: JSON.stringify(
                        {
                            "title":title,
                            "content": content
                        }
                    ),
                    success: function(){
                        renderAllQuestions(getAllQuestions());
                        alert("Successfully eddied");
                    },
                    error: errorReport
                });
            }
        }

        function clearQuestionTable(){
            $("#questionTable").html("").html(" <tr><th>ID</th><th>Question title</th><th>Question content</th><th>Actions</th></tr>");
        }

        function clearCategoryTable(){
            $("#categoriesTable").html("").html("<tr><th>ID</th><th>Name</th><th>Count</th><th>Actions</th></tr>");
        }

        function clearTagsTable(){
            $("#tagsTable").html("").html("<tr><th>ID</th><th>Title</th><th>Counter</th><th>Actions</th></tr>");
        }

        function showQuestions(){
            $("#allQuestions").show();
            $("#allTags").hide();
            $("#allCategories").hide();
        }

        function showCategories(){
            $("#allQuestions").hide();
            $("#allTags").hide();
            $("#allCategories").show();
        }

        function showTags(){
            $("#allQuestions").hide();
            $("#allTags").show();
            $("#allCategories").hide();
        }

        function errorReport(err){
            alert("Error!");
            console.log(err);
        }
    })
});