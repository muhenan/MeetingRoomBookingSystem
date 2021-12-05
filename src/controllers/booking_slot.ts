import { PrismaClient, User_Orders, Booking_Slot } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import { msgBody } from "../utils/msgBody";
import { WebInterface } from "../types/WebInterface";
import { BookingSlotStatus, OrderStatus } from "../types/enum";

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