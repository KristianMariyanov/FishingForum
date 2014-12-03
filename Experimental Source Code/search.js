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
        	$.ajaxSetup({
        		headers : {
        			"X-Parse-Application-Id" : "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco",
        			"X-Parse-REST-API-Key" : "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb"
        		}
        	});

        	var questionByTag = function (tagTitle) {
				getTagIdByTitle(tagTitle).done(function(data) {
        			var tagId = data.results[0].objectId;
        			var getQuestionsUrl = 'https://api.parse.com/1/classes/tagsMeta?include=question.category,question.author&where={"tag":{"__type":"Pointer","className":"tag","objectId":"' + tagId +'"}}'
        			getResults(getQuestionsUrl).done (function (data) {
        				console.log(data.results);
        				$.each(data.results, function (index, value) {
        					var question = Mustache.to_html(questionTemplate, value.question);
        					$(document.body).append(question);
        				})
        			}).fail (function (error) {
        				console.log(error)
        			});
        		}).fail(function (error) {
        			console.log(error)
        		});
        	}

        	var user = function (username) {
        		var getUserUrl = 'https://api.parse.com/1/users?where={"username":"' + username +'"}';
        		getResults(getUserUrl).done (function (data) {
        			debugger;
        			$.each(data.results, function (index, value) {
        					var user = Mustache.to_html(userTemplate, value);
        					$(document.body).append(user);
        				})
        		}).fail (function (error) {
        			console.log(error)
        		})
        	}

        	var getTagIdByTitle = function (tagTitle) {
        		return getResults('https://api.parse.com/1/classes/tag?where={"title":"' +  tagTitle + '"}')
        		
        	}

        	var getResults = function (url) {
        		return $.getJSON(url)
        	}

    		return {
    			questionByTag : questionByTag,
    			user : user
    		}
        })();