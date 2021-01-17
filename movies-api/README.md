# Assignment 2 - Agile Software Practice.

Name: Jiaqi Gu

## Target Web API.

...... Document the Web API that is the target for this assignment's CI/CD pipeline. Include the API's endpoints and any other features relevant to the creation of a suitable pipeline, e.g.

+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/upcoming - returns an array of upcoming movie objects.
+ Get /api/movies/topRated - returns an array of topRated movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Get /api/movies/:id/reviews - returns an array of reviews of specific movie.
+ Get /api/movies/:id/similar - returns an array of similar movies of specific movie.

+ Get /api/genres - returns an array of genre objects.

+ Get /api/people - returns an array of people objects.
+ Get /api/people/:id - returns detailed information on a specific person.
+ Get /api/people/:id/movies - returns an array of the specific person performed movie objects.

+ Get /api/users - returns an array of user objects.
+ Post /api/users - user login/registration.
+ Put /api/users/:id -  update a specific user.
+ Get /api/users/:userName/favourites -  returns an array of user favourite movies.
+ Post /api/users/:userName/favourites -  add a new movie to user favourites.
+ Get /api/users/:userName/collections -  returns an array of movies in user collections.
+ Post /api/users/:userName/collections -  add a new topRated movie to user collections.
+ Get /api/users/:userName/watchList -  returns an array of movies in user watchList.
+ Post /api/users/:userName/watchList -   add a new upcoming movie to user watchList.
+ Delete /api/users/:userName/watchList -  remove a specific movie from user watchList.
+ Get /api/users/:userName/userInfo -  returns user personal information.
+ Put /api/users/:userName/userInfo -  update user personal information. 

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ GET /api/movies/:id - test when the movie id doesn't exists. See tests/functional/api/movies/index.js 

+ GET /api/people/:id - test when the people id doesn't exists. See tests/functional/api/people/index.js 

+ GET /api/users -  Test getting user information without prior authentication. See tests/functional/api/users/index.js 

+ POST /api/users -  Test register when the username length is too short, when the password length is too short, when the password don't have at least one number and one letter. Test login when the username input is incorrect, when the password input is incorrect. See tests/functional/api/users/index.js 

+ POST /api/users/:userName/favourites - Test when the movie id doesn't exist. See tests/functional/api/users/index.js 

+ POST /api/users/:userName/watchList - Test when the movie id doesn't exist. See tests/functional/api/users/index.js 

+ DELETE /api/users/:userName/watchList - Test when the movie id doesn't exist. See tests/functional/api/users/index.js 

+ POST /api/users/:userName/collections - Test when the movie id doesn't exist. See tests/functional/api/users/index.js 

+ PUT /api/users/:userName/userInfo - Test when the userInfo is incorrect( lack any elements in userInfo). See tests/functional/api/users/index.js 

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://agile-assignment-2-staging.herokuapp.com/ - Staging deployment
+ https://agile-assignment-2-production.herokuapp.com/ - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

![][productionapp]

[If an alternative platform to Heroku was used then show the relevant page from that platform's UI.]

## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.


[stagingapp]: ./img/stagingapp.png
[productionapp]: ./img/productionapp.png