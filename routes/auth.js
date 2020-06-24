const express = require('express')
const passport = require('passport')
const router = express.Router()

const { ensureGuest } = require('../middleware/auth')

// login page 
router.get('/login', ensureGuest, (req, res) => {
    res.render('login')
})

// auth with google
router.get('/google',
    passport.authenticate('google', { scope: ['profile'] })
);

//google auth callback - google/callback
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => res.redirect('/chat')
);

// logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/auth/login')
})

module.exports = router
