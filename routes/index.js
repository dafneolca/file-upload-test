const express = require("express");
const router = express.Router();
const multer = require("multer");
const Picture = require("../models/pictures");

/* GET home page. */
router.get("/", (req, res, next) => {
  Picture.find({}, (err, pictures) => {
    if (err) {
      next(err);
    } else {
      const data = {
        pictures: pictures
      };
      res.render("index", data);
    }
  });
});

/* Post file with multer. */
const upload = multer({ dest: "./public/uploads/" });

router.post("/upload", upload.single("photo"), (req, res) => {
  const pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save(err => {
    if (err) {
      next(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
