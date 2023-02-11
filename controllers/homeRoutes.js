const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  console.log("test");
  res.render("homePage");
  //   try {
  //     const postData = await User.findAll({
  //       attributes: { exclude: ["password"] },
  //       order: [["name", "ASC"]],
  //     });
  //     const posts = postData.map((post) => post.get({ plain: true }));
  //     res.render("homePage", {
  //       posts,
  //       logged_in: req.session.logged_in,
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

module.exports = router;
