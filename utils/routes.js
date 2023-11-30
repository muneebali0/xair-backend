const { WRONG_HTTP_METHOD } = require("../controllers/common/error_codes");
const { authenticate } = require("../middleware/authenticate");
const { admin_auth } = require("../middleware/admin_auth");
const { member_auth } = require("../middleware/member_auth");
const { pilot_auth } = require("../middleware/pilot_auth");

const register_route = ({
  router = undefined,
  route = undefined,
  auth_required = false,
  admin_auth_required = false,
  member_auth_required = false,
  pilot_auth_required = false,

  get_method = undefined,
  post_method = undefined,
  put_method = undefined,
  delete_method = undefined,
} = {}) => {
  if (router != undefined || route != undefined) {
    let args = [route];
    if (auth_required) {
      args.push(authenticate);
    }
    if (admin_auth_required) {
      args.push(admin_auth);
    } else if (member_auth_required) {
      args.push(member_auth);
    } else if (pilot_auth_required) {
      args.push(pilot_auth);
    }

    if (get_method) {
      router.get(...args, get_method);
    } else if (post_method) {
      router.post(...args, post_method);
    } else if (put_method) {
      router.put(...args, put_method);
    } else if (delete_method) {
      router.delete(...args, delete_method);
    } else {
      router.post(...args, WRONG_HTTP_METHOD);
    }
  }
};

module.exports = {
  register_route,
};
