const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const { FILE_PATH } = require('./config')
const User = require('../src/model/user')
const db = require('../db')

require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? FILE_PATH.env_dev : FILE_PATH.env_prod,
})

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // 이 google id 로 가입된 유저가 있는지 확인
      const registeredUser = await new User(db, { google_id: profile.id }).findByGoogleId()
      if (registeredUser) {
        // 있으면, 기존에 있는 유저정보 가져오기
        done(null, registeredUser)
      } else {
        // 없으면, 새로 만들어주기
        await new User(db, {
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          google_id: profile.id,
        }).create()
        const newUser = await new User(db, { google_id: profile.id }).findByGoogleId()
        done(null, newUser)
      }
      // 로그인 시켜주기
    }
  )
)
