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