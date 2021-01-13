import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
const Schema = mongoose.Schema;

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
  password: {type: String, required: true
    // , validate: function(password){
    // return password.length>=5 && password.length<=15;}, 
    // message: "password length should be between 5 and 15."
  },
  favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}],
  collections: [{type: mongoose.Schema.Types.ObjectId, ref: 'TopRatedMovies'}],
  watchList: [{type: mongoose.Schema.Types.ObjectId, ref: 'UpcomingMovies'}],
  userInfo:UserInfoSchema
});

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (err, salt)=> {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, null, (err, hash)=> {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

export default mongoose.model('User', UserSchema);