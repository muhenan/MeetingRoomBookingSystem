import express, { Request, Response, NextFunction } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  userUpdateOrder,
  adminApproveOrder,
  adminRefuseOrder
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

router.put(
  "/user_update/:id",
  userUpdateOrder
)

router.put(
  "/admin_approve_order/:id",
  adminApproveOrder
)

router.put(
  "/admin_refuse_order/:id",
  adminRefuseOrder
)

export default router;
