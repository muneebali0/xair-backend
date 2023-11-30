module.exports.WRONG_HTTP_METHOD = (req, res) => {

    res.status(405).json( {
        code: 405,
        message: 'Http Method not allowed'
    });
};

module.exports.USER_NOT_ACTIVATED = {
    code: 302,
    message: 'User is not activated yet!'
};

module.exports.USER_NOT_FOUND = {
    code: 304,
    message: 'User you are trying to reach not exist in the system'
};

module.exports.USER_CURRENT_LOCATION_UNKNOWN = {
    code: 310,
    message: 'User Current Location is not updated on server, please check if your location service is active!'
};

module.exports.BADGE_NOT_FOUND = {
    code: 404,
    message: 'No Badge exist with requested ID'
};

module.exports.CATEGORY_NOT_FOUND = {
    code: 404,
    message: 'No Category exist with requested ID'
};

module.exports.FEED_NOT_FOUND = {
    code: 404,
    message: 'No Feed exist with requested ID'
};

module.exports.CHALLENGE_NOT_FOUND = {
    code: 404,
    message: 'No Challenge exist with requested ID'
};

module.exports.REWARD_NOT_FOUND = {
    code: 404,
    message: 'No Reward exist with requested ID'
};

module.exports.BAD_VALUE_FOR_ID = {
    code: 400,
    message: 'Bad ID Requested!'
};

module.exports.WRONG_PIN_CODE_SENT = {
    code: 403,
    message: 'Wrong pin-code has been submitted!'
};


module.exports.REQUEST_PARAMS_MISSING = {
    code: 304,
    message: 'Request params missing'
};

module.exports.BAD_VALUE_FOR_PASSWORD = {
  code : 400,
  message : 'Password Should not less than 6'
};

