require(['modules/headersNoSession'], function (headers) {
    $(document).ready(function () {
        $('#form').submit(function (event) {
            event.preventDefault();
            if ($('#search-options').val() === "question-by-tag") {
                var tagTitle = $('#search').val();
                search.questionByTag(tagTitle);
            } else if ($('#search-options').val() === "user") {
                var username = $('#search').val();
                search.user(username);
            }

        })
    })

    var questionTemplate = '<div class="questions"><p>{{title}}</p><span>{{author.username}}</span><span>{{createdAt}}</span><span>{{category.name}}</span><span>{{rating}}</span><span>{{viewCount}}</span></div>';
    var userTemplate = '<div class="users"><p>{{username}}</p><span>{{firstName}} </span><span>{{lastName}} </span><span>{{rating}}</span></div>';
    var search = (function () {
        headers;

        var questionByTag = function (tagTitle) {
            getTagIdByTitle(tagTitle).done(function (data) {
                var tagId = data.results[0].objectId;
                var getQuestionsUrl = 'https://api.parse.com/1/classes/tagsMeta?include=question.category,question.author&where={"tag":{"__type":"Pointer","className":"tag","objectId":"' + tagId + '"}}'
                getResults(getQuestionsUrl).done(function (data) {
                    console.log(data.results);
                    $.each(data.results, function (index, value) {
                        var question = Mustache.to_html(questionTemplate, value.question);
                        $(document.body).append(question);
                    })
                }).fail(function (error) {
                    console.log(error)
                });
            }).fail(function (error) {
                console.log(error)
            });
        }

        var user = function (username) {
            var getUserUrl = 'https://api.parse.com/1/users?where={"username":"' + username + '"}';
            getResults(getUserUrl).done(function (data) {
                if (data.results.length) {
                    $.each(data.results, function (index, value) {
                        var user = Mustache.to_html(userTemplate, value);
                        $(document.body).append(user);
                    })
                } else {
                    $(document.body).append('There is no user with username: "' + username + '"');
                }
            }).fail(function (error) {
                console.log(error)
            })
        }

        var getTagIdByTitle = function (tagTitle) {
            return getResults('https://api.parse.com/1/classes/tag?where={"title":"' + tagTitle + '"}')

        }

        var getResults = function (url) {
            return $.getJSON(url)
        }

        return {
            questionByTag: questionByTag,
            user: user
        }
    })();
})