import express from 'express';
var router = express.Router();
import {passport,createUser} from './user-services.js';

router.get('/session',(req,res)=>{
  if (req.isAuthenticated()){
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// Login page
router.post('/login', passport.authenticate('local'), function(req,res){
  res.sendStatus(200);
});

// Signup page
router.post('/signup', async (req, res)=> {
  const userCreated = await createUser(req.body);
  (userCreated) ? res.sendStatus(201) : res.sendStatus(401);
});

// Logout
router.get('/logout',(req,res)=>{
  req.logout();
  res.sendStatus(200);
});
export default router;
