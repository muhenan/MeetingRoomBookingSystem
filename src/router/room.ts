import express, { Request, Response, NextFunction } from "express";
import {
  importRoom,
  deleteRoom,
  getRoom,
  updateRoom
} from "../controllers/room"

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("api room is working");
});

router.post(
  "/import",
  importRoom
);

router.get(
  "/get",
  getRoom
);

router.delete(
  "/delete/:id",
  deleteRoom
)

router.put(
  "/update/:id",
  updateRoom
)

export default router;