import userModel from "../models/user.model.js";
import JWT from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const { Strategy: JwtStrategy, ExtractJwt } = JWT;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.KEY_JWT,
};

export default new JwtStrategy(opts, function (jwt_payload, done) {
  userModel.findOne({ _id: jwt_payload.id }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(err, false);
      // or you could create a new account
    }
  });
});
