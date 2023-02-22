const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all comments
router.get("/", (req, res) => {
  Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create  new comments
router.post("/", withAuth, async (req, res) => {
  console.log("show req comment");
  console.log(req);
  try {
    const commentText = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    if (commentText) {
      res.json(commentText);
    } else {
      res.status(404).end;
    }
  } catch (err) {
    res.redirect("login");
  }
  // Comment.create({ ...req.body, user_id: req.session.user_id })
  //   .then((dbCommentData) => res.json(dbCommentData))
  //   .catch((err) => {
  //     console.log(err);

  //     res.status(400).json(err);
  //   });
});

// delete comment
router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
