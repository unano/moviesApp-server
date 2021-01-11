import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import {movies} from './movies.js';
import peopleModel from '../api/people/peopleModel';
import {people} from './people.js';
import topRatedMovieModel from '../api/movies/topRatedMovieModel';
import {topRated} from './topRated.js';
import upcomingMovieModel from '../api/movies/upcomingMovieModel';
import {upcoming} from './upcoming.js';

const users = [
  {
    'username': 'user1',
    'password': 'test1',
    'userInfo':{"gender":"male",
    "birthday":"2000-01-01",
    "hobby":"sport",
    "movies":"movie1",
    "actors":"actor1",
    "introduce":"I'm who"}
  },
  {
    'username': 'user2',
    'password': 'test2',
    'userInfo':{"gender":"male",
    "birthday":"2000-01-01",
    "hobby":"sport",
    "movies":"movie2",
    "actors":"actor2",
    "introduce":"I'm good"}
  },
];


// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }

export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

export async function loadUpcomingMovies() {
  console.log('load seed data');
  console.log(upcoming.length);
  try {
    await upcomingMovieModel.deleteMany();
    await upcomingMovieModel.collection.insertMany(upcoming);
    console.info(`${upcoming.length} Upcoming Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

export async function loadTopRatedMovies() {
  console.log('load seed data');
  console.log(topRated.length);
  try {
    await topRatedMovieModel.deleteMany();
    await topRatedMovieModel.collection.insertMany(topRated);
    console.info(`${topRated.length} Top Rated Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

export async function loadPeople() {
  console.log('load seed data');
  console.log(people.length);
  try {
    await peopleModel.deleteMany();
    await peopleModel.collection.insertMany(people);
    console.info(`${people.length} People were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load people Data: ${err}`);
  }
}