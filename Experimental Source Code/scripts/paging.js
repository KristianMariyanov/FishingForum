require(['modules/headersNoSession'], function (headers) {
    var listItems = (function () {
	
		var getCategories = function () {
                url = 'https://api.parse.com/1/classes/category';
                return getResultsOfSpecificPage(url);
            };
			
        var getUsersOfSpecificPage = function (page, resultsOfPage) {
            var skip = (page - 1) * resultsOfPage;
            return getResultsOfSpecificPage('https://api.parse.com/1/users?limit=' + resultsOfPage + '&skip=' + skip);
        };

        var getQuestionsOfSpecificPageByCategory = function (page, resultsOfPage, categoryId) {
            var skip = (page - 1) * resultsOfPage;
            url = 'https://api.parse.com/1/classes/question?where={"category":{"__type":"Pointer","className":"category","objectId":"' + categoryId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
            return getResultsOfSpecificPage(url);
        };

        var getQuestionsOfSpecificPageByUser = function (page, resultsOfPage, userId) {
            var skip = (page - 1) * resultsOfPage;
            url = 'https://api.parse.com/1/classes/question?where={"author":{"__type":"Pointer","className":"_User","objectId":"' + userId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
            return getResultsOfSpecificPage(url);
        };

        var getAnswersOfSpecificPageByQuestion = function (page, resultsOfPage, questionId) {
            var skip = (page - 1) * resultsOfPage;
            url = 'https://api.parse.com/1/classes/answer?where={"question":{"__type":"Pointer","className":"question","objectId":"' + questionId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
            return getResultsOfSpecificPage(url);
        };

        var getAnswersOfSpecificPageByUser = function (page, resultsOfPage, userId) {
            var skip = (page - 1) * resultsOfPage;
            url = 'https://api.parse.com/1/classes/answer?where={"author":{"__type":"Pointer","className":"_User","objectId":"' + userId + '"}}&limit=' + resultsOfPage + '&skip=' + skip;
            return getResultsOfSpecificPage(url);
        };

        var getResultsOfSpecificPage = function (url) {
            var dataInfo = [];
            headers;

            $.ajax({
                method: 'GET',
                url: url,
                async: false,
                success: function (data) {
                    dataInfo = data.results
                },

                error: function (error) {
                    console.log(error);
                }
            })
            return dataInfo
        }
        return {
            getUsersOfSpecificPage: getUsersOfSpecificPage,
            getQuestionsOfSpecificPageByCategory: getQuestionsOfSpecificPageByCategory,
            getQuestionsOfSpecificPageByUser: getQuestionsOfSpecificPageByUser,
            getAnswersOfSpecificPageByQuestion: getAnswersOfSpecificPageByQuestion,
            getAnswersOfSpecificPageByUser: getAnswersOfSpecificPageByUser,
			getCategories : getCategories
        }
    })();

	console.log(listItems.getCategories());
})