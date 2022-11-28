import  express from "express";
import dotenv  from "dotenv";
import cors  from "cors";
import passport from "passport";
 
//* Helpers import => #helpers
import connectDB from "#helpers/connect_db.js"
import JwtStrategy from "#helpers/jwt_strategy.js"
 
//* Routes import => #routes
import authRouter from "#routes/auth.routes.js"

//* Setup Environment Variables
dotenv.config();

const { PORT } = process.env;
const app = express();

//* passport Middleware
passport.use(JwtStrategy)
  
//* Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize())

//* Root Route
app.get("/", (req, res) =>
  res.status(200).json({ status: "Backend running." })
);

//* Use Routes
app.use('/api/auth',authRouter)

//* 404 Route
app.use((req, res) => res.status(404).json({ status: "Page not found." }));

const initializeApp = async ()=> {
    try {
      await connectDB();
  
      app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
    } catch (e) {
      console.log(e);
    }
  };
initializeApp();