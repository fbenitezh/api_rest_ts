import express from "express";
import CategoryController from "../controllers/CategoryController";

const router = express.Router();
const controller = new CategoryController();


router.get('/', controller.find);

router.get('/:id', controller.read);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.softDelete);

export default router;