import { Router } from "express";

// system administration
import businessRoute from "../modules/system-administration/business/business.route.js";
import businessMemberRoute from "../modules/system-administration/business-member/business-member.route.js";
import roleRoute from "../modules/system-administration/role/role.route.js";
import userRoute from "../modules/system-administration/user/user.route.js"
import userMenuRoute from "../modules/system-administration/user-menu/user-menu.route.js"
import userBusinessMember from "../modules/system-administration/user-business-member/user-business-member.route.js"

// system setting
import groupMenuRoute from "../modules/system-setting/group-menu/group-menu.route.js"
import menuRoute from "../modules/system-setting/menu/menu.route.js"

const router = Router();

// system administration
router.use(
  "/business", 
  businessRoute
);

router.use(
  "/business-member",
  businessMemberRoute
);

router.use(
  "/role",
  roleRoute
);

router.use(
  "/user", 
  userRoute
);

router.use(
  "/user-menu", 
  userMenuRoute
);

router.use(
  "/user-business-member", 
  userBusinessMember
);

// system setting
router.use(
  "/group-menu", 
  groupMenuRoute
);

router.use(
  "/menu", 
  menuRoute
);

export default router;