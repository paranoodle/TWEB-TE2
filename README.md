# TWEB-TE2
## TWEB - Github API Demo

by Eléonore d'Agostino

## Intro

I decided to use the GitHub API, mainly because it was the only named I recognized out of the list (and I preferred to work with something I was more familiar with, if possible), and I didn't really have any ideas as to how to illustrate CORS well.

## Setting up

I originally decided to use the `angular` generator, despite never having used it before, since it seemed to be the simplest base for an AngularJS application. After over an hour of errors all over the Heroku logs, I went back to the `Express` generator, which I'd used for a previous exercise and felt a *little* more comfortable with. Once I had the example page pushed to Heroku and working, I started on the code proper.

## Libraries used

* Node.js with the [Express framework](http://expressjs.com/)
* [AngularJS](https://angularjs.org/)
* [Chart.js](http://www.chartjs.org/), with [angular-chart.js](http://jtblin.github.io/angular-chart.js/) for Angular compatibility
* [Bootstrap](http://getbootstrap.com/) for templates
* [Jade](http://jade-lang.com/) template engine instead of pure HTML
* [GitHub API](https://developer.github.com/v3/), with the [github wrapper](https://github.com/michael/github)

## Features

* Pages were written in Jade instead of HTML, and the layout was therefore converted (and adapted) from an HTML Bootstrap theme.
* Uses of Angular:
  * `ng-show` to only show some of the components once their content has been fetched
  * `ng-model` to handle input and fetching of data without refreshing the page
  * Custom controller to fetch user and repo data from GitHub and format it for use with jade
* Displays fun statistics about a user's repos!

## Difficulties

* **Making anything work on heroku**  
I know in theory how it works, but in practice getting a successful deployment takes several commits and lots of swearing.
* **GitHub's spelling**  
I spent over half an hour trying to figure out why the GitHub API wrapper was not working, before I realized that the object they use is in fact spelled "Github" and not "GitHub". Which is *wrong*.

## Known Issues

* Changing the chart data without refreshing the page (ex: searching for a second user on the same page) leads to two chart objects being displayed on the same canvas, and flickering when the user hovers over the chart data.
