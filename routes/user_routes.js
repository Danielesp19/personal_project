const express = require('express');
const router = express.Router();
const userController = require("../controllers/user")
const multer = require("multer")

const storage =multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null,"./uploads/users")
  },
  filename: (req,file,cb)=>{
    cb(null,file.originalname)
  },
});

const upload = multer({storage});
// Request para crear:

router.post("/new-user", upload.single("avatar"), userController.createUser);
router.get('/', userController.getLisUsers);
router.get('/:id', userController.getById);
router.patch('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);




module.exports = router;

