import { Router } from "express";

export const defaultRoutes = (controller) => {
  const router = Router();

  router.get("/", (req, res) => {
    //controller.showHome(req, res);
    console.log('aaaaaaaaaaaaa');
    res.render("home");
  });

  return router;
}