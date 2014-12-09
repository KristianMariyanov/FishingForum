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
                $('#main').load('createPost.html');
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
                console.log('yes');
                console.log(listItems.getQuestionsOfSpecificPageByCategory(page,2,categoryId));
                //$('#main').load('createPost.html');
            });

            this.get('#/users', function () {
                $('#main').load('createPost.html');
            });

            this.get('#/forum/category/:category/:question', function () {
                var categoryId = this.params['category'];
                var question = this.params['question'];
                $('#main').load('addAnswer.html');
            });

            this.get('#/login', function () {
                $('#main').load('createPost.html');
            });
        });
        $(function () {
            app.run()
        });
    })(jQuery);
})

//var listItems = (function () {
//
//    var headers = $.ajaxSetup({
//        headers: {
//            "X-Parse-Application-Id": "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco",
//            "X-Parse-REST-API-Key": "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb"
//        }
//    });
//
//    var getCategories = function () {
//        url = 'https://api.parse.com/1/classes/category';
//        return getResultsOfSpecificPage(url);
//    };
//
//    var getUsersOfSpecificPage = function (page, resultsOfPage) {
//        var skip = (page - 1) * resultsOfPage;
//        return getResultsOfSpecificPage('https://api.parse.com/1/users?limit=' + resultsOfPage + '&skip=' + skip);
//    };
//
//    var getQuestionsOfSpecificPageByCategory = function (page, resultsOfPage, categoryId) {
//        var skip = (page - 1) * resultsOfPage;
//        url = 'https://api.parse.com/1/classes/question?where={"category":{"__type":"Pointer","className":"category","objectId":"' + categoryId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
//        return getResultsOfSpecificPage(url);
//    };
//
//    var getQuestionsOfSpecificPageByUser = function (page, resultsOfPage, userId) {
//        var skip = (page - 1) * resultsOfPage;
//        url = 'https://api.parse.com/1/classes/question?where={"author":{"__type":"Pointer","className":"_User","objectId":"' + userId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
//        return getResultsOfSpecificPage(url);
//    };
//
//    var getAnswersOfSpecificPageByQuestion = function (page, resultsOfPage, questionId) {
//        var skip = (page - 1) * resultsOfPage;
//        url = 'https://api.parse.com/1/classes/answer?where={"question":{"__type":"Pointer","className":"question","objectId":"' + questionId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
//        return getResultsOfSpecificPage(url);
//    };
//
//    var getAnswersOfSpecificPageByUser = function (page, resultsOfPage, userId) {
//        var skip = (page - 1) * resultsOfPage;
//        url = 'https://api.parse.com/1/classes/answer?where={"author":{"__type":"Pointer","className":"_User","objectId":"' + userId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
//        return getResultsOfSpecificPage(url);
//    };
//
//    var getResultsOfSpecificPage = function (url) {
//        var dataInfo = [];
//        headers;
//
//        $.ajax({
//            method: 'GET',
//            url: url,
//            async: false,
//            success: function (data) {
//                dataInfo = data.results
//            },
//
//            error: function (error) {
//                console.log(error);
//            }
//        });
//        return dataInfo
//    };
//    return {
//        getUsersOfSpecificPage: getUsersOfSpecificPage,
//        getQuestionsOfSpecificPageByCategory: getQuestionsOfSpecificPageByCategory,
//        getQuestionsOfSpecificPageByUser: getQuestionsOfSpecificPageByUser,
//        getAnswersOfSpecificPageByQuestion: getAnswersOfSpecificPageByQuestion,
//        getAnswersOfSpecificPageByUser: getAnswersOfSpecificPageByUser,
//        getCategories : getCategories
//    }
//})();
