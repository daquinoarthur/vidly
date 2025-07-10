const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Documentary" },
  { id: 3, name: "Romance" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
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
  res.status(201).send(genre);
});

router.put("/:id", (req, res) => {
  const { id: genreId } = req.params;
  const genre = genres.find((genre) => genre.id === parseInt(genreId));
  if (!genre)
    return res.status(404).send(`Genre with the id ${genreId} was not found`);

  const { error } = validateGenre(req.body);
  if (error)
    return res
      .status(400)
      .send(error.details.map((detail) => detail.message).join(", "));

  genre.name = req.body.name;

  res.status(200).send(genre);
});

router.delete("/:id", (req, res) => {
  const { id: genreId } = req.params;
  const genre = genres.find((genre) => genre.id === parseInt(genreId));
  if (!genre)
    return res.status(404).send(`Genre with the id ${genreId} was not found`);

  const genreIndex = genres.indexOf(genre);

  genres.splice(genreIndex, 1);

  res.status(204).send();
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const genre = genres.find((genre) => genre.id === parseInt(id));
  if (!genre)
    return res.status(404).send(`The genre with the id ${id} was not found!`);
  res.status(200).send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
