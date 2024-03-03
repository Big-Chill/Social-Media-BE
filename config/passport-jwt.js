const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require(path.join(__dirname, '..', 'model', 'user'));

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const initialize = (passport) => {

    const authenticateUser = async (jwt_payload, done) => {
        try {
            const user = await userModel.findById(jwt_payload.user._id);
            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    };

    passport.use(new JwtStrategy(options, authenticateUser));
};

module.exports = {
    initJwt: initialize,
};