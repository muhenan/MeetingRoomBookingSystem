import express, { Request, Response, NextFunction } from "express";
import { createBookingSlot } from "../controllers/booking_slot";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("api booking_slot is working");
});

router.post(
  "/create/:room_ListId",
  createBookingSlot
);


export default router;