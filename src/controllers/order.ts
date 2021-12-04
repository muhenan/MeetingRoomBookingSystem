import { PrismaClient, User_Orders, Booking_Slot } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import { msgBody } from "../utils/msgBody";
import { WebInterface } from "../types/WebInterface";
import { BookingSlotStatus, OrderStatus } from "../types/enum";

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response,) => {
  // 是否有这个 slot
  const exist = await prisma.booking_Slot.count({
    where: {
      id: req.body.booking_SlotId
    }
  });
  if (exist == 1) {
    const booking_slot = await prisma.booking_Slot.findUnique({
      where: {
        id: req.body.booking_SlotId
      }
    });
    // 这个 slot 是否可以预定
    if (booking_slot.status == BookingSlotStatus.BOOKABLE) {
      // 创建订单
      const order = await prisma.user_Orders.create({
        data: {
          user_id: req.body.user_id,
          number_of_people: req.body.number_of_people,
          purpose: req.body.purpose,
          status: OrderStatus.PROGRESS,
          create_time: Date().toString(),
          booking_slot: { connect: { id: req.body.booking_SlotId } }
        },
      });
      // 修改 slot 的状态为 progress
      await prisma.booking_Slot.update({
        where: {
          id: req.body.booking_SlotId
        },
        data: {
          status: BookingSlotStatus.PROGRESS
        }
      });
      res.json(msgBody("创建订单成功", order));
    }
  }
  res.status(400).json(msgBody("该会议室在该时段不可预定"));
};


export const deleteOrder = async (req: Request, res: Response,) => {
  try {
    await prisma.user_Orders.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(msgBody("删除订单成功"));
  } catch (err) {
    res.status(404).json(msgBody("订单不存在，无法删除"));
  }
};

export const getAllOrder = async (req: Request, res: Response,) => {
  const allOrder = await prisma.user_Orders.findMany();
  res.json(msgBody("获取所有会议室成功", {
    orderList: allOrder
  }));
};