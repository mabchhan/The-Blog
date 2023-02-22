const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/newpost", withAuth, (req, res) => {
  res.render("newpost", { layout: "dashboard" });
});

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
        //logged_in: req.session.logged_in,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", { posts, layout: "dashboard" });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("editpost", { post, layout: "dashboard" });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});
module.exports = router;
