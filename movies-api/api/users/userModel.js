import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true, validate: function(password){
    return password.length>=5 && password.length<=15;}, 
    message: "password length should be between 5 and 15."},
  favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}]
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

UserSchema.methods.favouritesDuplicate = function(id, cb) {
  for(let i = 0; i < this.favourites.length; i++) {
      bcrypt.compare(id, this.favourites[i], (err, isMatch) =>{
        if (isMatch) {
          return cb(null, isMatch);
      }
      return cb(null, isMatch);
      });
    }
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