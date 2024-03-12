import express from "express";
import { updateUserInfo, activateUser, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updatePassword, getAllUsers, updateUserRole, deleteUser, } from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post('/registration', registerUser);

userRouter.post('/activate-user', activateUser);

userRouter.post('/login', loginUser);

userRouter.get('/logout', isAuthenticated, logoutUser);

userRouter.get("/refresh", updateAccessToken);

userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

userRouter.put("/update-user-password", isAuthenticated, updatePassword);

userRouter.get("/get-users", getAllUsers);

userRouter.get("/update-user", isAuthenticated, authorizeRoles("admin"), updateUserRole);

userRouter.delete("/delete-user", isAuthenticated, authorizeRoles("admin"), deleteUser);

export default userRouter;