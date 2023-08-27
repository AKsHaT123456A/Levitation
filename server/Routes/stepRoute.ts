import express from "express";
import { getData, storeStepData, uploadFile } from "../Controller/stepContoller";
import multer from "multer";
import path from "path";
import { auth } from "../Middleware/auth";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/details/:userId", storeStepData);
router.get("/user/:userId", getData);
router.post(
  "/upload",
  (req, res, next) => {
    upload.array("files")(req, res, (err) => {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(500).json({ message: "File upload failed" });
      }
      next();
    });
  },
  auth,
  uploadFile
);

export default router;
