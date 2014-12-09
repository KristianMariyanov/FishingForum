require(['paging'], function (listItems) {
    (function ($) {
        var app = $.sammy(function () {

            this.get('#/', function () {
                $('#main').load('search.html'/*index.html*/);
            });

            this.get('#/login', function () {
                $('#main').load('createPost.html');
            });

            this.get('#/register', function () {
                //register form
                $('#main').load('createPost.html');
            });

            this.get('#/forum', function () {
                //list all categories with 2 question
                listItems.getCategories().done(function (data) {
                    $('#main').html('');
                    console.log(data.results);
                    $.each(data.results, function (index, value) {
                        listItems.getQuestionsOfSpecificPageByCategory(1,2,value['objectId']).done(function (dataQuestions) {
                            value['questions'] = dataQuestions.results;
                            $.get('templates/forumTemplate.html', function (template) {
                                var output = Mustache.to_html(template, value);
                                $('#main').append(output);
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
                    $('#main').html('');
                    listItems.getQuestionsOfSpecificPageByCategory(page,5,categoryId).done(function (dataQuestions) {
                        dataQuestions['category'] = data;
                        $.get('templates/categotyTemplate.html', function (template) {
                            var output = Mustache.to_html(template, dataQuestions);
                            $('#main').append(output);
                        })
                    })
                });
            });

            this.get('#/users', function () {
                $('#main').load('createPost.html');
            });

            this.get('#/forum/:question/', function () {
                window.location.replace('#/' + this.params['question'] + '/page/1');
            });

            this.get('#/forum/:question/page/:page', function () {
                var questionId = this.params['question'];
                var page = this.params['page'];
                listItems.getQuestionById(questionId).done(function (data) {
                    $('#main').html('')
                    listItems.getAnswersOfSpecificPageByQuestion(page,5,questionId).done(function (dataAnswers) {
                        dataAnswers['question'] = data;
                        $.get('templates/questionTemplate.html', function (template) {
                            var output = Mustache.to_html(template, dataAnswers);
                            $('#main').append(output);
                        })
                    })
                });

                $('#main').load('addAnswer.html');
            });

            this.get('#/forum/:category/createQuestion', function () {

                $('#main').load('createPost.html');
            });
        });
        $(function () {
            app.run()
        });
    })(jQuery);
})

