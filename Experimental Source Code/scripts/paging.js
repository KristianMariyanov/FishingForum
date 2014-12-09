define (function () {
        var listItems = (function () {

        var getCategories = function () {
            url = 'https://api.parse.com/1/classes/category';
            return getResultsOfSpecificPage(url);
        };

        var getCategotyById = function (id) {
            url = 'https://api.parse.com/1/classes/category/' + id;
            return getResultsOfSpecificPage(url);
        }

        var getQuestionById = function (id) {
            url = 'https://api.parse.com/1/classes/question/' + id +'?include=author,category';
            return getResultsOfSpecificPage(url);
        };

        var getUsersOfSpecificPage = function (page, resultsOfPage) {
            var skip = (page - 1) * resultsOfPage;
            return getResultsOfSpecificPage('https://api.parse.com/1/users?limit=' + resultsOfPage + '&skip=' + skip);
        };

        var getQuestionsOfSpecificPageByCategory = function (page, resultsOfPage, categoryId) {
            var skip = (page - 1) * resultsOfPage;
            url = 'https://api.parse.com/1/classes/question?include=author,category&where={"category":{"__type":"Pointer","className":"category","objectId":"' + categoryId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
            return getResultsOfSpecificPage(url);
        };

        var getQuestionsOfSpecificPageByUser = function (page, resultsOfPage, userId) {
            var skip = (page - 1) * resultsOfPage;
            url = 'https://api.parse.com/1/classes/question?where={"author":{"__type":"Pointer","className":"_User","objectId":"' + userId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
            return getResultsOfSpecificPage(url);
        };

        var getAnswersOfSpecificPageByQuestion = function (page, resultsOfPage, questionId) {
            var skip = (page - 1) * resultsOfPage;
            url = 'https://api.parse.com/1/classes/answer?include=author,question&where={"question":{"__type":"Pointer","className":"question","objectId":"' + questionId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
            return getResultsOfSpecificPage(url);
        };

        var getAnswersOfSpecificPageByUser = function (page, resultsOfPage, userId) {
            var skip = (page - 1) * resultsOfPage;
            url = 'https://api.parse.com/1/classes/answer?where={"author":{"__type":"Pointer","className":"_User","objectId":"' + userId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
            return getResultsOfSpecificPage(url);
        };

        var getResultsOfSpecificPage = function (url) {

            return $.ajax({
                headers: {
                    "X-Parse-Application-Id": "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco",
                    "X-Parse-REST-API-Key": "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb"
                },
                method: 'GET',
                url: url
            });
        };
        return {
            getUsersOfSpecificPage: getUsersOfSpecificPage,
            getQuestionsOfSpecificPageByCategory: getQuestionsOfSpecificPageByCategory,
            getQuestionsOfSpecificPageByUser: getQuestionsOfSpecificPageByUser,
            getAnswersOfSpecificPageByQuestion: getAnswersOfSpecificPageByQuestion,
            getAnswersOfSpecificPageByUser: getAnswersOfSpecificPageByUser,
            getCategories : getCategories,
            getQuestionById : getQuestionById,
            getCategotyById : getCategotyById
        }
    })();
    return listItems;
});

