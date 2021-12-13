import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import techFunding from "./data/tech_fundings.json";

// checks for the deployed environment. Important that the localhost/... is unique!
const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost/livesession-mongo";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// name of model should be pascalcase. If we have a big file, should take this out and make a file just for that.
const User = mongoose.model("User", {
  name: String,
  age: Number,
});

const newUser = new User({
  name: "Sofiap",
  age: 28,
});

const newUser2 = new User({
  name: "Fredrik",
  age: 31,
});

const newUser3 = new User({
  name: "Nelson",
  age: 1,
});

if (process.env.RESET_DB) {
  // deleteMany is from mongoose. Be careful with this - delete will remove everything. Should only be done while setting things up. Later, maybe people will add their info, and it might not be saved somewhere else.
  const seedDatabase = async () => {
    await User.deleteMany({});
    newUser.save();
    newUser2.save();
    newUser3.save();
  };
  seedDatabase();
}

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
