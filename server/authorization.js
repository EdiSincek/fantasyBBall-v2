const qs = require("qs");
const axios = require("axios");
const auth_constants = require("./authorization.json");

exports.auth = {
  getInitialAuthorization() {
    const AUTH_HEADER = Buffer.from(
      `${auth_constants.CUSTOMER_ID}:${auth_constants.CUSTOMER_SECRET}`,
      `binary`
    ).toString(`base64`);
    return axios({
      url: auth_constants.AUTH_ENDPOINT,
      method: "post",
      headers: {
        Authorization: `Basic ${AUTH_HEADER}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36",
      },
      data: qs.stringify({
        client_id: auth_constants.CUSTOMER_ID,
        client_secret: auth_constants.CUSTOMER_SECRET,
        redirect_uri: "oob",
        code: auth_constants.YAHOO_AUTH_CODE,
        grant_type: "authorization_code",
      }),
    }).catch((err) => {
      console.error(`Error in getInitialAuthorization(): ${err}`);
    });
  },

  refreshAuthorizationToken(token) {
    const AUTH_HEADER = Buffer.from(
      `${auth_constants.CUSTOMER_ID}:${auth_constants.CUSTOMER_SECRET}`,
      `binary`
    ).toString(`base64`);
    return axios({
      url: auth_constants.AUTH_ENDPOINT,
      method: "post",
      headers: {
        Authorization: `Basic ${AUTH_HEADER}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36",
      },
      data: qs.stringify({
        redirect_uri: "oob",
        grant_type: "refresh_token",
        refresh_token: token,
      }),
    }).catch((err) => {
      console.error(`Error in refreshAuthorizationToken(): ${err}`);
    });
  },
};
