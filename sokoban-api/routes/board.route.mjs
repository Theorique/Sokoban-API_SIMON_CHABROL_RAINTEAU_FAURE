import { Router } from "express";

export const boardRoutes = (controller) => {
  const router = Router();

  router.get("/", (req, res) => {
    controller.showList(req, res);
  });

  router.post("/add", (req, res) => {
    console.log(req.query)
    controller.createBoard(req, res);
  });

  return router;
}