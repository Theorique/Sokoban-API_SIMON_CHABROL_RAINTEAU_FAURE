import { Router } from "express";

export const rowsRoutes = (controller) => {
  const router = Router();

  router.get("/", (req, res) => {
    controller.showList(req, res);
  });

  return router;
}