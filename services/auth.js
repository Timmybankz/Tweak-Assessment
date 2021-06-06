const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    if ('x-access-token' in req.headers) {
        try {
            const accessToken = req.headers['x-access-token'];
            const { email, exp } = await jwt.verify(accessToken, process.env.JWT_KEY);
            req.headers.email = email;
            if (exp < Date.now().valueOf() / 1000) { 
                return res.status(401).json('Session expired, please login again');
            } 
            next();
        } catch (error) {
            return res.status(401).json('Authentication failed due to session');
        }
    } else {
        res.status(401).json('Invalid/Expired Token');
    }
}
