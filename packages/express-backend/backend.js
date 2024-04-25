import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};



app.use(cors());
app.use(express.json());

// GET
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  let promise = userServices.getUsers(name, job);

  promise
      .then(result => {
          res.send({ users_list: result });
      })
      .catch(error => {
          res.status(400).send("Failed to fetch users.");
      });
})


// POST AND DELETE
app.post("/users", (req, res) => {
  const userToAdd = req.body;

  let promise = userServices.addUser(userToAdd);

  promise
      .then(result => {
          res.status(201).json(result);
      })
      .catch(error => {
          res.status(404).send("Failed to add user.");
      });

});


// Delete User
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  let promise = userServices.deleteUser(id);

  promise
      .then(result => {
          res.status(204).json(result);
      })
      .catch(error => {
          res.status(404).send("User not found.");
      });
});



// Listening
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});



