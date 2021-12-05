import { PrismaClient, User_Orders, Booking_Slot } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import { msgBody } from "../utils/msgBody";
import { WebInterface } from "../types/WebInterface";
import { BookingSlotStatus, OrderStatus } from "../types/enum";
import { connect } from "http2";

const prisma = new PrismaClient();

export const isBookingSlotExpired = (booking_slot: Booking_Slot): boolean => {
  const booking_slot_date = new Date(booking_slot.date);
  const booking_slot_timestamp = Date.parse(booking_slot_date.toLocaleDateString());
  const Now = new Date();
  const Now_timestamp = Date.parse(Now.toLocaleDateString());
  if ((booking_slot_timestamp > Now_timestamp) ||
    (booking_slot_timestamp == Now_timestamp && Now.getHours() < booking_slot.time)
  ) {
    return false;
  }
  return true;
}

export const createBookingSlot = async (req: Request, res: Response,) => {
  const room_ListId = req.params.room_ListId;
  const date = req.body.date;
  const times = req.body.times;
  const errList = [];
  const successList = [];
  for (let i = 0; i < times.length; i++) {
    try {
      await prisma.booking_Slot.create({
        data: {
          date: date,
          time: times[i],
          room: { connect: { id: room_ListId } }
        }
      });
      successList.push(times[i]);
    } catch (err) {
      console.log(err);
      errList.push(times[i]);
    }
  }
  res.json(msgBody(`添加slot完成，成功${successList.length}个，失败${errList.length}个`,
    { success: successList, fail: errList }));
};