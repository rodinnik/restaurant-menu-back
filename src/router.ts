import { Router } from "express";
import CategoryController from "./categoryController";
import PositionController from "./positionController";

const router = Router();

//получить список всех категорий
router.get("/categories", CategoryController.getAll);
//получить определенную каьегорию по id со всеми ее позициями
router.get("/categories/:id", CategoryController.getCategoryWithPositions);
//удалить категорию
router.delete(`/categories/:id`, CategoryController.delete);
// создать категорию
router.post(`/categories`, CategoryController.create);
// обновить категорию
router.patch("/categories/:id", CategoryController.update);

//получить список всех позиций
router.get("/positions", PositionController.getAll);
//получить определенную позицию по id
router.get("/positions/:id", PositionController.getPositionById);
//удалить позицию
router.delete(`/positions/:id`, PositionController.delete);
//создать позицию
router.post(`/positions`, PositionController.create);
// обновить позицию
router.patch("/positions/:id", PositionController.update);

export default router;
