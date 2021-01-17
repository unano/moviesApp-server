import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import movieModel from '../movies/movieModel';
import topRatedMovieModel from '../movies/topRatedMovieModel';
import upcomingMovieModel from '../movies/upcomingMovieModel';
import passport from '../../authenticate';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.find().then(users =>  res.status(200).json(users)).catch(next);
});

// register
router.post('/', async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    const err = new Error('Please pass username and password.',);
      err.status = 'fail';
      err.statusCode = 400;
      next(err);
  }
  if (req.query.action === 'register') {
    var reg=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    const user = await User.findByUserName(req.body.username).catch(next);
      if (user) {
        const err = new Error('Username is used.');
        err.status = 'fail';
        err.statusCode = 400;
        next(err);
      }
      else{
        var result=reg.test(req.body.password);
        if(result){
          await User.create(req.body).catch(next);
          res.status(201).json({
            code: 201,
            msg: 'Successful created new user.',
          });}
        else{
          const err = new Error('Password is at least 5 characters long and contain at least one number and one letter.');
          err.status = 'fail';
          err.statusCode = 400;
          next(err);
        }
      }
    } else {
      const user = await User.findByUserName(req.body.username).catch(next);
      if (!user) {
        const err = new Error('Authentication failed. User not found.');
        err.status = 'fail';
        err.statusCode = 400;
        next(err);
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.username, process.env.SECRET);
          // return the information including token as JSON
          res.status(200).json({
            success: true,
            token: 'BEARER ' + token,
          });
        } else {
          const err = new Error('Authentication failed. Wrong password.');
          err.status = 'fail';
          err.statusCode = 400;
          next(err);
        }
      });
    }
});

// Update a user
router.put('/:id',  (req, res, next) => {
    if (req.body._id) delete req.body._id;
     User.update({
      _id: req.params.id,
    }, req.body, {
      upsert: false,
    })
    .then(user => res.json(200, user)).catch(next);
});

//Add a favourite. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favourites', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const newFavourite = req.body.id;
  if(!newFavourite){
    const err = new Error(`Please enter movie id.`);
    err.status = 'fail';
    err.statusCode = 400;
    next(err);
  }
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(newFavourite).catch(next);
  if(!movie){
    const err = new Error(`Movie not found.`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
  }
  const user = await User.findByUserName(userName);
  await user.favourites.push(movie._id);
  var dedupe = require('dedupe');
  user.favourites = dedupe(user.favourites);
  await user.save(); 
  res.status(201).json(user); 
});

router.get('/:userName/favourites', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const userName = req.params.userName;
  User.findByUserName(userName).populate('favourites').then(
    user => res.status(201).json(user.favourites)
  ).catch(next);
});

router.post('/:userName/collections', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const collections = req.body.id;
  if(!collections){
    const err = new Error(`Please enter movie id.`);
    err.status = 'fail';
    err.statusCode = 400;
    next(err);
  }
  const userName = req.params.userName;
  const movie = await topRatedMovieModel.findByMovieDBId(collections).catch(next);
  if(!movie){
    const err = new Error(`Movie not found.`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
  }
  const user = await User.findByUserName(userName);
  await user.collections.push(movie._id);
  var dedupe = require('dedupe');
  user.collections = dedupe(user.collections);
  await user.save(); 
  res.status(201).json(user); 
});

router.get('/:userName/collections', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const userName = req.params.userName;
  User.findByUserName(userName).populate('collections').then(
    user => res.status(201).json(user.collections)
  ).catch(next);
});

router.post('/:userName/watchList', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const watchList = req.body.id;
  if(!watchList){
    const err = new Error(`Please enter movie id.`);
    err.status = 'fail';
    err.statusCode = 400;
    next(err);
  }
  const userName = req.params.userName;
  const movie = await upcomingMovieModel.findByMovieDBId(watchList).catch(next);
  if(!movie){
    const err = new Error(`Movie not found.`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
  }
  const user = await User.findByUserName(userName);
  await user.watchList.push(movie._id);
  var dedupe = require('dedupe');
  user.watchList = dedupe(user.watchList);
  await user.save(); 
  res.status(201).json(user); 
});

router.get('/:userName/watchList', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const userName = req.params.userName;
  User.findByUserName(userName).populate('watchList').then(
    user => res.status(201).json(user.watchList)
  ).catch(next);
});

router.delete('/:userName/watchList', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const id = req.body.id;
  const userName = req.params.userName;
  const movie = await upcomingMovieModel.findByMovieDBId(id).catch(next);
  const user = await User.findByUserName(userName).catch(next);
  if(movie){
    const index = user.watchList.indexOf(movie._id);
    if (index > -1) {
      user.watchList.splice(index, 1);
      await user.save(); 
      res.status(200).send({message: `Deleted movie id: ${id}.`,status: 200});
    }else{
      res.status(404).send({message: `Unable to find movie with id: ${id}.`, status: 404});
    }
  }
  else{
    res.status(404).send({message: `Unable to find movie with id: ${id}.`, status: 404});
  }
  });

router.get('/:userName/userInfo', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const userName = req.params.userName;
  User.findByUserName(userName).then(
    user => res.status(201).json(user.userInfo)
  ).catch(next);
});

router.put('/:userName/userInfo', passport.authenticate('jwt', {session: false}), async (req, res, next) => { 
  if(req.body.gender && req.body.birthday && req.body.hobby && req.body.movies && req.body.actors && req.body.introduce){
    User.findOneAndUpdate({username: req.params.userName},{userInfo:req.body})
    .then(function(){
      User.findByUserName(req.params.userName)
      .then(user => res.json(200, user)).catch(next);
    });
  }else {
    const err = new Error(`Lack userInfo propoerty`);
    err.status = 'fail';
    err.statusCode = 400;
    next(err);
  }
});

export default router;
