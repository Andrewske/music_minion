const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const passport = require('passport');
const CLIENT_LOGIN_REDIRECT = 'http://localhost:3000/explore';

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      req.user.user_id,
    ]);

    delete user.rows[0].password;

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/auth/logout
// @desc    Logout Route
// @access  Public

router.get('/logout', (req, res) => {
  req.logout();
  res.send({ msg: 'Bye Bye! Hope to see you again soon :)' });
});

// Login with Passport
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      const errors = [err];
      return res.status(400).json({ errors: errors });
    }
    if (info) {
      const errors = [info];
      return res.status(400).json({ errors: errors });
    }
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'No user found!' }] });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

//Authentication with Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    prompt: 'consent',
  })
);

router.get('/google/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user has failed to authenticate with Google',
  });
});

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: CLIENT_LOGIN_REDIRECT,
    failureRedirect: 'api/auth/google/failed',
  })
);

//Authentication with Spotify
router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: [
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'streaming',
      'user-read-email',
      'user-read-private',
      'playlist-read-private',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-library-modify',
      'user-library-read',
      'user-top-read',
      'user-read-recently-played',
      'user-follow-read',
      'user-follow-modify',
    ],
  })
);

router.get('/spotify/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user has failed to authenticate with Spotify',
  });
});

router.get(
  '/spotify/redirect',
  passport.authenticate('spotify', {
    successRedirect: CLIENT_LOGIN_REDIRECT,
    failureRedirect: 'api/auth/spotify/failed',
  })
);

module.exports = router;
