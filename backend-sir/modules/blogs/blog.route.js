const router = require("express").Router();
const { checkRole } = require("../../utils/sessionManager");
const Controller = require("./blog.controller");
const { validate } = require("./blog.validate");

router.post(
  "/",
  checkRole(["user", "admin"]),
  validate,
  async (req, res, next) => {
    try {
      console.log("route", req.body);
      req.body.author = req.body.author || req.currentUser;
      const result = await Controller.create(req.body);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const { title, author, page, limit } = req.query;
    const search = { title, author };
    const result = await Controller.list(search, page, limit);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get("/my-blogs", checkRole(["user"]), async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await Controller.getAuthorBlogs(
      req.currentUser,
      page,
      limit
    );
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get("/published-only", async (req, res, next) => {
  try {
    const { page, limit, title, author } = req.query;
    const search = { title, author };
    const result = await Controller.getPublishedBlogs(search, page, limit);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get(
  "/admin/:slug",
  checkRole(["user", "admin"]),
  async (req, res, next) => {
    try {
      const { slug } = req.params;
      const payload = { slug, author: req.currentUser, roles: req.roles };
      const result = await Controller.getById(payload);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const payload = { slug, author: req.currentUser };
    const result = await Controller.getBySlug(payload);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.put("/:slug", checkRole(["user", "admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    const payload = {
      slug,
      author: req.currentUser,
      roles: req.roles,
      ...req.body,
    };
    const result = await Controller.updateBySlug(payload);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.patch("/:slug", checkRole(["user", "admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await Controller.changeStatus(slug);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
