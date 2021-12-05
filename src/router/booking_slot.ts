import express, { Request, Response, NextFunction } from "express";
import {
  createBookingSlot,
  getAllBookingSlot,
  deleteBookingSlot
} from "../controllers/booking_slot";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("api booking_slot is working");
});

router.post(
  "/create/:room_ListId",
  createBookingSlot
);

router.get(
  "/get",
  getAllBookingSlot
);

router.delete(
  "/delete/:id",
  deleteBookingSlot
);

export default router;