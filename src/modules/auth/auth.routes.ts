// import { Router } from "express";
// import * as controller from "./auth.controller";

// const router = Router();

// router.post("/signup", controller.signup);
// router.post("/signin", controller.signin);

// export default router;


import { Router } from "express";
import { signup, signin } from "./auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
