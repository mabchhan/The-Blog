const router = require("express").Router();

const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoute");
const CommentRoutes = require("./commentRoutes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", CommentRoutes);

module.exports = router;
