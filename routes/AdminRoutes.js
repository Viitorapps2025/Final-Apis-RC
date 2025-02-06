import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { registerAdmin, loginAdmin } from '../controllers/AdminAuthController.js';
import { getUserbyId, getAllUsers, updateUser, deleteUserById, updateUserProfilePicture } from '../controllers/UserController.js'

import checkAdminAuth from '../middlewares/checkAdminAuth.js';


const router = express.Router();
// Multer setup for file upload
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


// Public Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/getUserById/:id', checkAdminAuth, getUserbyId);
router.get('/all/user', checkAdminAuth, getAllUsers);
router.put('/update/:id', checkAdminAuth, updateUser);
router.post('/updateProfilePicture/:id', upload.single('profilePicture'),checkAdminAuth, updateUserProfilePicture);
router.delete('/delete/:id', checkAdminAuth, deleteUserById);




export default router