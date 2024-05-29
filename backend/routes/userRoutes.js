import express from "express"
import { isLogin, isLogout } from "../middleware/auth.js";


import { insertUser,verifyLogin,verifyMail,loginLoad, userLogout } from "../controllers/userController";

const route = express.Router();
// route.use(bodyParser.urlencoded({extended:true}))

route.use();
// route.get("/register", isLogout, loadRegister);


route.post("/register", insertUser);
route.get("/verify", verifyMail);

route.get("/", isLogout, loginLoad);
route.get("/logout", isLogin, userLogout);

route.post("/login", verifyLogin);
