import express from "express";

import { creatPermissionTagsController,findPermissionTagsController,errorHandler } from "#controllers/permissionTags.controller.js";

const router = express.Router();

router.post('/permission',creatPermissionTagsController,errorHandler)
router.get('/permission',findPermissionTagsController,errorHandler)

export default router;