const FILE_PATH = {
  env_dev: '.env.dev',
  env_prod: '.env.prod'
}

const logFormat =
  ':remote-addr [:date[clf]] ":method :url" :status :res[content-length] - :response-time ms ":user-agent"'

module.exports = {
  FILE_PATH,
  logFormat
}
