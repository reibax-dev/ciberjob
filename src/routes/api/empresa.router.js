import { Router } from "express";
import empresaApiController from "../../controllers/empresa/empresa.api.controller.js";

const router = Router();

router.get("/", empresaApiController.getAll);
router.get("/:id", empresaApiController.getById);

router.post("/", empresaApiController.create);

router.put("/:id", empresaApiController.update);

router.delete("/:id", empresaApiController.remove);

export default router;