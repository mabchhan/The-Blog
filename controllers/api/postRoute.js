const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const { route } = require("./userRoutes");

// get all post
router.get("/", (req, res) => {
  Post.findAll({
    include: [{ model: User }, { model: Comment, include: { model: User } }],
  })
    .then((postData) => {
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get post by id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new post
router.post("/", withAuth, (req, res) => {
  Post.create({ ...req.body, user_id: req.session.user_id })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update post
router.put("/:id", withAuth, (req, res) => {
  Post.update(req.body, { where: { id: req.params.id } })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete post
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
