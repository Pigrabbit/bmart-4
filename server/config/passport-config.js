const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const { FILE_PATH } = require('./config')

require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? FILE_PATH.env_dev : FILE_PATH.env_prod,
})

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    () => {
      console.log('callback here')
    }
  )
)
