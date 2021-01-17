# Assignment 2 - Web API.

Name: Jiaqi Gu

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,
 
 + Feature 1 - get upcoming movies, topRated movies 
 + Feature 2 - get a set of movie actors' information
 + Feature 4 - user can see their upcoming and topRated movies, and they can add upcoming /topRated movies to their watchList/collections, user can also delete movie from watchList
 + Feature 5 - user can see their personal information and modify thir personal information.
 + Feature 6 - get movie review and similar movies, get one actor's personal information and their performing movies. However, these APIs use TMDB APIs for some reasons(for example, to get similar movies, a large amount of movie data heve to be stored in database, which is difficult for me to ).

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

Describe getting/installing the software, perhaps:

```bat
git clone https://github.com/unano/wad-assignment2
```

followed by installation

```bat
npm install
```

## API Configuration
Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY=TMDBKEY
mongoDB=MongoURL
SEED_DB=true
SECRET=JWTSecret

```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|   | GET | POST | PUT | DELETE |
|---|---|---|---|---
| /api/users |Gets a list of registered users | user login/registration | N/A | N/A 
| /api/users/{userid} | N/A | N/A | update user _id | N/A 
| /api/users/{userName}/favourites | get one user's all favourite movies | add one movie to the user's favourite | N/A | N/A 
| /api/users/{userName}/collections | get all movies in one user's collections | add one movie to the user's favourite | N/A | N/A |
| /api/users/{userName}/watchList | get all movies in one user's watchList | add one movie to the user's watchList | N/A | remove one moive from one user's watchList |
| /api/users/{userName}/userInfo | get one user's personal info | N/A | modify one user's personal info | N/A |
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/upcoming |Gets a list of upcoming movies | N/A | N/A | N/A |
| /api/movies/topRated |Gets a list of topRated movies | N/A | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | N/A | N/A | N/A |
| /api/movies/{movieid}/similar | Get all similar movies for movie | N/A | N/A | N/A |
| /api/genres |Gets a list of movie genres | N/A | N/A | N/A |
| /api/people |Gets a list of movie actors | N/A | N/A | N/A |
| /api/people/{peopleid} |Gets a movie actors | N/A | N/A | N/A |
| /api/people/{peopleid}/movies |Gets a list of the actor performed movies | N/A | N/A | N/A |

[Swaggerhub](https://app.swaggerhub.com/apis/unano/WAD-assignment2/1.0.0).


## Security and Authentication
Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.

I use the previous authentication, but I change the API that need to be authenticated to get access to. I remove the authentication for all routes in /movies, add I add authentication for all routes in users except POST of /users since I need to use this route to get key for authentication. So the following are all routes that need authentication:

GET of /users;  
GET & POST of /users/:userName/favourites; 
GET & POST of /users/:userName/favourites;   
GET & POST of /users/:userName/collections;   
GET & POST & DELETE of /users/:userName/watchList;   
GET & PUT of /users/:userName/userInfo

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

Since I move the assignment 1 folder into reactApp folder and do all integration and modification in it, it seemed that there is no need to attach a React App repoistory link here, and all the integration and modification can be seen in reactApp folder.
I tried to create new API according to what functions I have realized in assignment1, and except from getGenres, all the following API call has been integrated with reactApp. Some API like /api/movies is easy to integrate and only need to do modification on files in api folder. Some API like login, signup, addWatchList, removeWatchList need to do modification on some other files, and I modified a lot of code when integrating login & signup since the original code completely can't support these two API. All the modification steps for integration can be seen in git history.

~~~Javascript
export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const addFavorites = (userName, id) => {
  return fetch(`/api/users/${userName}/favourites`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
      },
      method: 'post',
      body: JSON.stringify({ id: id })
  }).then(res => res.json())
};

export const getFavourite = (userName) => {
  return fetch(
    `/api/users/${userName}/favourites`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

export const addWatchList = (userName, id) => {
  return fetch(`/api/users/${userName}/watchList`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
      },
      method: 'post',
      body: JSON.stringify({ id: id })
  }).then(res => res.json())
};

export const getWatchList = (userName) => {
  return fetch(
    `/api/users/${userName}/watchList`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

export const removeWatchList = (userName, id) => {
  return fetch(`/api/users/${userName}/watchList`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
      },
      method: 'delete',
      body: JSON.stringify({ id: id })
  }).then(res => res.json())
};

export const addCollections = (userName, id) => {
  return fetch(`/api/users/${userName}/collections`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
      },
      method: 'post',
      body: JSON.stringify({ id: id })
  }).then(res => res.json())
};

export const getCollections = (userName) => {
  return fetch(
    `/api/users/${userName}/collections`,{headers: {
     'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

export const editInfo = (userName, info) => {
  return fetch(`/api/users/${userName}/userInfo`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
      },
      method: 'put',
      body: JSON.stringify(info)
  }).then(res => res.json())
};

export const getInfo = (userName) => {
  return fetch(
    `/api/users/${userName}/userInfo`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

export const getMovies = () => {
    return fetch(
       '/api/movies',{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

export const getGenres = () => {
    return fetch(
       '/api/genres',{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

export const getMovie = id => {
    return fetch(
       `/api/movies/${id}`,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

export const getMovieReviews = id => {
    return fetch(
       `/api/movies/${id}/reviews`,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

export const getUpcomingMovies = () => {
    return fetch(
       '/api/movies/upcoming',{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

export const getTopRatedMovies = () => {
    return fetch(
       '/api/movies/topRated',{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

export const getPopularPeople = () => {
    return fetch(
       '/api/people',{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

export const getPeople = id => {
    return fetch(
       `/api/people/${id}`,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };
  
export const getPeopleMovieCredit = id => {
    return fetch(
       `/api/people/${id}/movies`,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

export const getSimilarMovies = id => {
    return fetch(
       `/api/movies/${id}/similar`,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

~~~

## Extra features

. . Briefly explain any non-standard features, functional or non-functional, developed for the app.  

I use helmet to make Express apps more secure.

## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  

>1. Swagger 

I use Swagger to do API documentation.
![][swagger1]
![][swagger2]
![][swagger3]

>2. Mongoose Custom validation

I use Mongoose Custom validation to validate whether username length is between 3 and 15.

~~~Javascript

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true
    , validate: function(username){
      return username.length>=3 && username.length<=15;}, 
      message: "username length should be between 3 and 15."},
  password: {type: String, required: true},
  favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}],
  collections: [{type: mongoose.Schema.Types.ObjectId, ref: 'TopRatedMovies'}],
  watchList: [{type: mongoose.Schema.Types.ObjectId, ref: 'UpcomingMovies'}],
  userInfo:UserInfoSchema
});

~~~

>3. Nested document/subDocuments in Mongo/Mongoose

UserInfoSchema is a subdocument of UserSchema.

~~~Javascript

const UserInfoSchema = new Schema({
  gender:{ type: String },
  birthday:{ type: String },
  hobby:{ type: String },
  movies:{ type: String },
  actors:{ type: String },
  introduce:{ type: String },
});

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true
    , validate: function(username){
      return username.length>=3 && username.length<=15;}, 
      message: "username length should be between 3 and 15."},
  password: {type: String, required: true},
  favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}],
  collections: [{type: mongoose.Schema.Types.ObjectId, ref: 'TopRatedMovies'}],
  watchList: [{type: mongoose.Schema.Types.ObjectId, ref: 'UpcomingMovies'}],
  userInfo:UserInfoSchema
});

~~~

>4. Helmet, Morgan and new Error Handler
These are all covered in the video and I just use them.

~~~Javascript
app.use(helmet());
~~~

~~~Javascript
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
~~~

~~~Javascript
const errHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
~~~


[swagger1]: ./public/swagger1.png
[swagger2]: ./public/swagger2.png
[swagger3]: ./public/swagger3.png