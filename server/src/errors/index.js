const { errorType } = require('./error-type')

const getErrorCode = (errorName) => {
  return errorType[errorName]
}

module.exports = { getErrorCode }
