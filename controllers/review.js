const { Review, User } = require("../models");

const getAllReviewsOfAGame = (req, res, next) => {
  const { gameId } = req.params;

  return Review.findAll({
    where: { gameId },
    include: [
      {
        model: User,
        attributes: ["id", "name", "lastName"],
      },
    ],
    attributes: ["id", "content", "rating"],
  })
    .then((reviews) => res.status(201).send(reviews))
    .catch((err) => next(err));
};

const getAReviewOfAGameFromAUser = async (req, res, next) => {
  const { gameId, userName } = req.params;
  console.log(userName);
  const userId = await User.findOne({ where: { name: userName } });
  console.log(userId);
  return Review.findAll({
    where: { gameId, userId: userId.id },
    include: [
      {
        model: User,
        attributes: ["id", "name", "lastName"],
      },
    ],
    attributes: ["id", "content", "rating"],
  })
    .then((review) => res.send(review))
    .catch((err) => console.log(err));
};

const createAReviewForAGameFromAUser = async (req, res, next) => {
  const { gameId, userId } = req.params;
  const { content, rating } = req.body;
  console.log(req.body);
  const user = await User.findByPk(userId);
  return Review.create({ content, rating, userId, gameId })
    .then((review) => res.status(201).send({ user, review }))
    .catch((err) => console.log(err));
};

module.exports = {
  getAllReviewsOfAGame,
  getAReviewOfAGameFromAUser,
  createAReviewForAGameFromAUser,
};
