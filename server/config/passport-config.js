const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const { FILE_PATH } = require('./config')

require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? FILE_PATH.env_dev : FILE_PATH.env_prod,
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback
      // 이 google id 로 가입된 유저가 있는지 확인

      if (registeredUser) {
        //  있으면, 기존에 있는 유저정보 가져오기
        done(null, registeredUser);
      } else {
        //  없으면, 새로 만들어주기

        done(null, newUser);
      }

      // 로그인 시켜주기
    }
  )
)
