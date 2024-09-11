import path, { dirname } from "path"
import { fileURLToPath } from "url"
import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/public/multi")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const publicPath = path.join(__dirname, "public")

export const uploader = multer({storage})
export default __dirname