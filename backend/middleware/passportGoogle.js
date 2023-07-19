const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const authService = require('../services/authService');
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.SERVER_URL + "/auth/google/callback",
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            const data = await authService.createAccountFromGoogle({ email: profile.emails[0].value, fullname: profile.displayName, name: profile.name.givenName });
            return done(null, data);
        } catch (error) {
            return done(error)
        }
        // return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    done(null, user)
});