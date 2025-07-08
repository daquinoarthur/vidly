const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Documentary" },
  { id: 3, name: "Romance" },
];

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res
      .status(400)
      .send(error.details.map((detail) => detail.message).join(", "));
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
  res.status(201).send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
