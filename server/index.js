import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
//* Helpers import => #helpers
import connectDB from "#helpers/connect_db.js";
import JwtStrategy from "#helpers/jwt_strategy.js";

//* Middleware import => #middleware
import auth from "#middleware/auth.middleware.js";
import { AuthorizationMiddleware } from "#middleware/authorization.middleware.js";
import { AuthorizationAdminMiddleware } from "#middleware/authorization.middleware.js";

//* Routes import => #routes
import authRouter from "#routes/auth.routes.js";
import etablissementRouter from "#routes/etablissement.routes.js";
import brancheRouter from "#routes/branch.routes.js";
import zoneRouter from "#routes/zone.routes.js";
import postRouter from "#routes/post.routes.js";
import employerRouter from "#routes/employer.routes.js";
import permissionTagsRouter from "#routes/permissionTags.routes.js";
import presenceRouter from "#routes/presence.routes.js";
import autorizationRouter from "#routes/autorization.routes.js";
//* Setup Environment Variables
dotenv.config();

const { PORT } = process.env;
const app = express();

//* passport Middleware
passport.use(JwtStrategy);

//* Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//* Root Route
app.get("/", (req, res) =>
  res.status(200).json({ status: "Backend running." })
);

// * Error Handler Auth
const errorHandler = (error, req, res, next) => {
  return res.status(500).json({ send2: false, error: error });
};

//* Use Routes
app.use("/api/auth", authRouter);

app.use("/api", auth, etablissementRouter, errorHandler);
app.use("/api", auth, brancheRouter, errorHandler);
app.use("/api", auth, autorizationRouter, errorHandler);
app.use("/api", auth, AuthorizationMiddleware, postRouter, errorHandler);
app.use("/api", auth, AuthorizationMiddleware, zoneRouter, errorHandler);
app.use("/api", auth, AuthorizationMiddleware, employerRouter, errorHandler);
app.use("/api", auth, AuthorizationMiddleware, presenceRouter, errorHandler);
app.use(
  "/api",
  auth,
  AuthorizationAdminMiddleware,
  permissionTagsRouter,
  errorHandler
);

//* 404 Route
app.use((req, res) => res.status(404).json({ status: "Page not found." }));

const initializeApp = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () =>
      console.log(`Backend listening on port ${PORT}`)
    );
    // Socket setup
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", function (socket) {
      console.log(socket.id);
      socket.on("room", (data) => {
        socket.join(data);
      });
      console.log("Made socket connection");
      socket.on("UPDATE-PRESENCE", (data) => {
        console.log("Updated presence");
        io.in(data).emit("RELODE-PRESECE", "room");
      });
    });
  } catch (e) {
    console.log(e);
  }
};
initializeApp();
