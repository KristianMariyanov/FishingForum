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

            console.log(this.params['category']);
            console.log(this.params['page']);
            //$('#main').load('createPost.html');
        });

        this.get('#/login', function () {
            $('#main').load('createPost.html');
        });

        this.get('#/login', function () {
            $('#main').load('createPost.html');
        });

        this.get('#/login', function () {
            $('#main').load('createPost.html');
        });
    });
    $(function () {
        app.run()
    });
})(jQuery);