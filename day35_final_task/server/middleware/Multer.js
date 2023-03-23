import multer from "multer";
import { getCurrentDir } from "../static-path/Static-path.js";
import { join } from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {;
    cb(null, join(getCurrentDir(), "../../front-end/public/Images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage: storage });