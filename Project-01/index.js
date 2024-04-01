// AIM - restfull API's

const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const { timeStamp } = require("console");

// instance of express
const app = express();
const PORT = 8000;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/experiment-1")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Mongo Error", err);
  });
// Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    profession: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timeStamp: true }
);

// model
const User = mongoose.model("user", userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const log = `${Date.now()}: ${req.method}: ${req.path} Successfull\n`;
  fs.appendFile("./log.txt", log, (err, data) => {
    next();
  });
});

// Routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
  ${allDbUsers
    .map(
      (user) =>
        `<li>${user.first_name} - ${user.profession} -${user.email}</li>`
    )
    .join("")}
  </ul>
  
  `;
  res.send(html);
});

// REST API
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    // TO DO: Edit any existing user using id
    const user = await User.findByIdAndUpdate(req.params.id, {
      last_name: "More",
    });
    return res.json({ status: "Success" });
  })
  .delete(async (req, res) => {
    // TO DO: Delete any existing user using id
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  // TO DO: Create new user
  const body = req.body;
  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.profession
  ) {
    return res.status(400).json({ msg: "All fields are required!" });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    profession: body.profession,
  });

  console.log("result", result);

  return res.status(201).json({
    msg: "success",
  });
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
