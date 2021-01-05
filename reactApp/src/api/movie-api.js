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
        'Content-Type': 'application/json'
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