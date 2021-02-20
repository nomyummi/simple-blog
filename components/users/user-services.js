import User from './user-model.js';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import validator from 'validator';
const LocalStrategy = passportLocal.Strategy;

// TODO  - add catches to all async functions (check post-services.js too)
async function createUser(body){
  let {firstName,lastName,username,password} = body;
  username = validator.trim(username);
  username = validator.escape(username);
  password = validator.trim(password);
  password = validator.escape(password);
  // look if username already exists
  const isFirstNameValid = validator.isAlpha(firstName) && validator.isLength(firstName,{min: 1,max:50});
  const isLastNameValid = validator.isAlpha(lastName) && validator.isLength(lastName,{min: 1,max:50});
  const isUsernameValid = validator.isLength(username,{min:5,max:30});
  const isPasswordValid = validator.isLength(password,{min:8,max:128})
  try {
    const usernameExists =  await User.findOne({username: username}).exec();
    if (isFirstNameValid && isLastNameValid && isUsernameValid && isPasswordValid && !usernameExists){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
          const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            hash: hash,
            salt: salt
          })
          newUser.save();
          });
        });
        return true;
      } 
    else {
      return false;
    }
  } catch (err){
    console.log(err);
    return false;
  }
}

// Passport
passport.use(new LocalStrategy(
  function(username,password,done){
    User.findOne({username: username}).then((user)=>{
      if (!user){
        return done(null,false, {message: "Incorrect username"});
      }
      bcrypt.compare(password,user.hash).then((res)=>{
        if (res){
          return done(null,user);
        } else {
          return done(null,false, {message: "Incorrect password"});
        }
      })
    })
  }
));
// TODO - after the above is figured out, only allow logged in users to create posts (protected-route)
// TODO - automatically replace log in/sign up button with a logout button to remove a session
// Finally - add styling to everything
// Extra features later - delete posts depending on user
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
  });
});

export {passport,createUser};