var app = angular.module('rtfmApp', ['ngRoute', 'firebase']);

app.constant('fb', { 
	url: "https://wilson-rtfm.firebaseio.com/" 
});


app.config(function($routeProvider){
	$routeProvider
	.when('/threads', {
		templateUrl: '/templates/threads.html',
		controller: 'threadsCtrl',
		resolve: {
			threadsRef: function(threadService){
				return threadService.getThreads();
			}
		}
	})
	.when('/threads/:threadId', {
		templateUrl: '/templates/thread.html',
		controller: 'threadCtrl',
		resolve: {
			threadRef: function (threadService, $route) {
				return threadService.getThread($route.current.params.threadId);
			},
			commentsRef: function (threadService, $route){
				return threadService.getComments($route.current.params.threadId);
			}
			
		}
	})
	.otherwise({
		redirectTo: '/threads'
	})
});