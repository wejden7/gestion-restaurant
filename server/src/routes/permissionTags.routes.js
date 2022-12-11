import express from "express";

import { creatPermissionTagsController,errorHandler } from "#controllers/permissionTags.controller.js";

const router = express.Router();

router.post('/permission',creatPermissionTagsController,errorHandler)

export default router;