// AIM - restfull API's

const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

// instance of express
const app = express();
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const log = `${Date.now()}: ${req.method}: ${req.path} Successfull\n`;
  fs.appendFile("./log.txt", log, (err, data) => {
    next();
  });
});

// Routes
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  
  `;
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    // TO DO: Edit any existing user using id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // TO DO: Delete any existing user using id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, response) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
