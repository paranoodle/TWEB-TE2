var app = angular.module("twebApp", ['chart.js']);

app.controller("GitHubController", function($scope) {
  $scope.title = "Please enter a username below";
  
  var github = new Github({
    // this is an old token, kept as example. heroku uses a new one
    token: "199455c3dd5f97e1ee599e202a41880602a683cb",
    auth: "oauth"
  });

  $scope.on_user = function(username) {
    $scope.show = false
    $scope.error = false
    $scope.title = "Viewing the statistics of user " + username
    
    var user = github.getUser();
    
    user.show(username, function(err, user) {
      if (err) {
        $scope.error = "Error retrieving GitHub user"
        return;
      }
      
      $scope.user = user
    });
    
    user.userRepos(username, function(err, repos) {
      
      if (err) {
        $scope.error = "Error retrieving GitHub repo"
        return;
      }
      
      $scope.max_fork = {}
      var max_fork_val = Math.max.apply(Math, repos.map(function(r){return r.forks_count}));
      
      if (max_fork_val == 0) {
        $scope.max_fork.text = "None of your repos have been forked!"
        $scope.max_fork.url = ""
        $scope.max_fork.url_text = ""
      } else {
        var max_fork_obj = repos.find(function(o){return o.forks_count == max_fork_val});
        
        $scope.max_fork.text = max_fork_obj.name + " - " + max_fork_val + " forks"
        $scope.max_fork.url = max_fork_obj.html_url
        $scope.max_fork.url_text = "Go to " + max_fork_obj.name
      }
      
      $scope.max_watch = {}
      var max_watch_val = Math.max.apply(Math, repos.map(function(r){return r.watchers_count}));
      
      if (max_watch_val == 0) {
        $scope.max_watch.text = "None of your repos have any watchers!"
        $scope.max_watch.url = ""
        $scope.max_watch.url_text = ""
      } else {
        var max_watch_obj = repos.find(function(o){return o.watchers_count == max_watch_val});
        
        $scope.max_watch.text = max_watch_obj.name + " - " + max_watch_val + " watchers"
        $scope.max_watch.url = max_watch_obj.html_url
        $scope.max_watch.url_text = "Go to " + max_watch_obj.name
      }
      
      $scope.most_recent = {}
      var most_recent_val = Math.max.apply(Math, repos.map(function(r){
          return new Date(r.updated_at)
        }));
      
      var most_recent_obj = repos.find(function(o){
          return new Date(o.updated_at).getTime() == new Date(most_recent_val).getTime()
        });
      
      $scope.most_recent.text = most_recent_obj.name + " - updated " + most_recent_obj.updated_at
      $scope.most_recent.url = most_recent_obj.html_url
      $scope.most_recent.url_text = "Go to " + most_recent_obj.name
      
      $scope.max_issues = {}
      var max_issues_val = Math.max.apply(Math, repos.map(function(r){return r.open_issues_count}));
      if (max_issues_val == 0) {
        $scope.max_issues.text = "None of your repos have any issues! Congrats!"
        $scope.max_issues.url = ""
        $scope.max_issues.url_text = ""
      } else {
        var max_issues_obj = repos.find(function(o){return o.open_issues_count == max_issues_val});
        
        $scope.max_issues.text = max_issues_obj.name + " - " + max_issues_val + " open issues"
        $scope.max_issues.url = max_issues_obj.html_url
        $scope.max_issues.url_text = "Go to " + max_issues_obj.name
      }
      
      $scope.data = {}
      $scope.data.sizes = repos.map(function(r){return r.size});
      $scope.data.labels = repos.map(function(r){return r.name});
      
      $scope.show = true;
      
      $scope.$apply();
    });
  }
});