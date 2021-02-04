import express from 'express';
var router = express.Router();

// TODO: Future features - Oauth

// Login page
// TODO: Future features, when login is created
// router.get('/login', function(req, res) {
//   res.send('NOT IMPLEMENTED: Check if user is already logged in (session), otherwise redirect. Would redirect happen here or in lcient?');
// });

router.post('/login', function(req, res) {
  res.send('NOT IMPLEMENTED: Login ');
});


// Signup page
// TODO: Future features, when login is created
// router.get('/sign-up', function(req, res) {
//   res.send('NOT IMPLEMENTED: Check if user is already logged in (session), otherwise redirect. Would redirect happen here or in lcient?');
// });

router.post('/sign-up', function(req, res) {
  res.send('NOT IMPLEMENTED: Create an account');
});

export default router;
