require(['paging'], function (listItems) {
    (function ($) {
        var app = $.sammy(function () {

            this.get('#/', function () {
                $('#forum-panel').load('search.html'/*index.html*/);
            });

            this.get('#/login', function () {
                $('#forum-panel').load('createPost.html');
            });

            this.get('#/register', function () {
                //register form
                $('#forum-panel').load('templates/registerTemplate.html');
            });

            this.get('#/forum', function () {
                //list all categories with 2 question
                listItems.getCategories().done(function (data) {
                    $('#forum-panel').html('');
                    console.log(data.results);
                    $.each(data.results, function (index, value) {
                        listItems.getQuestionsOfSpecificPageByCategory(1,2,value['objectId']).done(function (dataQuestions) {
                            value['questions'] = dataQuestions.results;
                            $.get('templates/forumTemplate.html', function (template) {
                                var output = Mustache.to_html(template, value);
                                $('#forum-panel').append(output);
                            })
                        }).fail(function (er) {
                            console.log(er)
                        });
                    })
                }).fail(function (er) {
                    console.log(er)
                });
            });

            this.get('#/forum/category/:category', function () {
                //TODO: the link doesn't work if ends with '/' ex. 'forum/category/name/'
                window.location.replace('#/forum/category/' + this.params['category'] + '/page/1');
            });

            this.get('#/forum/category/:category/page/:page', function () {
                //get id and print

                var categoryId = this.params['category'];
                var page = this.params['page'];
                //TODO: refactor
                listItems.getCategotyById(categoryId).done(function (data) {
                    $('#forum-panel').html('');
                    listItems.getQuestionsOfSpecificPageByCategory(page,5,categoryId).done(function (dataQuestions) {
                        dataQuestions['category'] = data;
                        $.get('templates/categoryTemplate.html', function (template) {
                            var output = Mustache.to_html(template, dataQuestions);
                            $('#forum-panel').append(output);
                        })
                    })
                });
            });

            this.get('#/users', function () {
                //$('#forum-panel').load('createPost.html');
            });

            this.get('#/users/:userId', function () {
                var userId = this.params['userId'];
                $('#forum-panel').html('');
                listItems.getUserById(userId).done(function(data){
                    listItems.getAnswersOfSpecificPageByUser(data['objectId']).done(function (answerData) {
                        data['answers'] = answerData.results;
                        listItems.getQuestionsOfSpecificPageByUser(data['objectId']).done(function (questionData) {
                            data['questions'] = questionData.results;
                            $.get('templates/userTemplate.html', function (template) {
                                var output = Mustache.to_html(template, data);
                                $('#forum-panel').append(output);
                            })
                        });
                    });
                });

                //$('#forum-panel').load('createPost.html');
            });

            this.get('#/forum/:question', function () {
                window.location.replace('#/forum/' + this.params['question'] + '/page/1');
            });

            this.get('#/forum/:question/page/:page', function () {
                var questionId = this.params['question'];
                var page = this.params['page'];
                listItems.getQuestionById(questionId).done(function (data) {
                    $('#forum-panel').html('')
                    listItems.getAnswersOfSpecificPageByQuestion(page,5,questionId).done(function (dataAnswers) {
                        dataAnswers['question'] = data;
                        $.get('templates/questionTemplate.html', function (template) {
                            var output = Mustache.to_html(template, dataAnswers);
                            $('#forum-panel').append(output);
                        })
                    })
                });

                $('#forum-panel').load('addAnswer.html');
            });

            this.get('#/forum/:category/createQuestion', function () {

                $('#forum-panel').load('createPost.html');
            });
        });
        $(function () {
            app.run()
        });
    })(jQuery);
})

