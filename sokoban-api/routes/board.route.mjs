import { Router } from "express";

export const boardRoutes = (controller) => {
  const router = Router();

  router.get("/", (req, res) => {
    controller.showList(req, res);
  });

  router.get("/:name", (req, res) => {
    controller.getBoardByName(req, res);
  });

  router.post("/add", (req, res) => {
    controller.createBoard(req, res);
  });

  router.put("/edit/:boardId", (req, res) => {
    controller.editBoard(req, res);
  });

  router.delete("/:boardId", (req, res) => {
    controller.deleteBoard(req, res);
  });

  return router;
}