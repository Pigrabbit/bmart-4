exports.errorName = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
}

exports.errorType = {
  BAD_REQUEST: {
    message: 'Bad Request.',
    statusCode: 400,
  },
  UNAUTHORIZED: {
    message: 'Unauthorized.',
    statusCode: 401,
  },
  INTERNAL_SERVER_ERROR: {
    message: ' Internal Server Error.',
    statusCode: 500,
  },
}
