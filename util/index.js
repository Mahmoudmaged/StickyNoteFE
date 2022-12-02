const jwt = require("jsonwebtoken");

module.exports = {

    //Token Verification API
    verifyToken: (req, resp, next) => {
        token = req.body.token;
        if (token && token !== undefined && token !== null) {
            if (tokenBlackList.includes(token))
                resp.json({ message: "authentication failed", status: 401 });
            else {
                jwt.verify(token, "mySecret", function(err, decoded) {
                    if (err)
                        resp.json({ message: "not authentication or error in token", status: 401 });
                    else {
                        next();
                    }

                });
            }

        } else {
            resp.json({
                message: "error in token or token not provided",
                status: 401,
            });
        }
    },

};