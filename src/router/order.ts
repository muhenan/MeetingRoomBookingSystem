import express, { Request, Response, NextFunction } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder
} from "../controllers/order";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("api order is working");
});

router.post(
  "/create",
  createOrder
);

router.delete(
  "/delete/:id",
  deleteOrder
)

router.get(
  "/get",
  getAllOrder
);

export default router;
