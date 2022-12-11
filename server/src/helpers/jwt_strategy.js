import userModel from "#models/user.model.js";
import employerModel from "#models/employer.model.js";
import JWT from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const { Strategy: JwtStrategy, ExtractJwt } = JWT;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.KEY_JWT,
};

export default new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await userModel.findOne({ _id: jwt_payload.id });
    const employer = await employerModel.findById(jwt_payload.id);

    if (user) {
      const newuser = { _id: user.id, role: jwt_payload.role };
      return done(null, newuser);
    } else if (employer) {
      const newemployer = { _id: employer.id, role: jwt_payload.role };
      return done(null, newemployer);
    } else {
      return done(true, false);
      // or you could create a new account
    }
  } catch (error) {
    return done(error, false);
  }
});
