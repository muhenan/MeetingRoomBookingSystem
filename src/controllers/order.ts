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

export const userUpdateOrder = async (req: Request, res: Response,) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await prisma.user_Orders.update({
      where: { id: id },
      data: {
        purpose: req.body.purpose,
        number_of_people: req.body.number_of_people
      }
    });
    res.json(msgBody("更新信息成功"));
  } catch (err) {
    res.status(500).json(msgBody("更新信息失败"));
  };
};

export const adminApproveOrder = async (req: Request, res: Response,) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await prisma.user_Orders.update({
      where: { id: id },
      data: {
        status: OrderStatus.APPROVAL,
        note: req.body.note,
        review_time: Date().toString()
      }
    });
    const order = await prisma.user_Orders.findUnique({
      where: { id: id }
    });
    await prisma.booking_Slot.update({
      where: { id: order.booking_SlotId },
      data: {
        status: BookingSlotStatus.APPROVAL
      }
    });
    res.json(msgBody("更新信息成功"));
  } catch (err) {
    res.status(500).json(msgBody("更新信息失败"));
  };
};

export const adminRefuseOrder = async (req: Request, res: Response,) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    // 更新订单的信息
    await prisma.user_Orders.update({
      where: { id: id },
      data: {
        status: OrderStatus.REFUSE,
        note: req.body.note,
        review_time: Date().toString()
      }
    });

    // 通过订单找到 booking slot
    const order = await prisma.user_Orders.findUnique({
      where: { id: id }
    });
    const booking_slot = await prisma.booking_Slot.findUnique({
      where: { id: order.booking_SlotId }
    });

    // 检测该 booking slot 是否已过期
    let new_booking_slot_status = BookingSlotStatus.N0NBOOKABLE;

    const booking_slot_date = new Date(booking_slot.date);
    const booking_slot_timestamp = Date.parse(booking_slot_date.toLocaleDateString());
    const Now = new Date();
    const Now_timestamp = Date.parse(Now.toLocaleDateString());

    if ((booking_slot_timestamp > Now_timestamp) ||
      (booking_slot_timestamp == Now_timestamp && Now.getHours() < booking_slot.time)
    ) {
      new_booking_slot_status = BookingSlotStatus.BOOKABLE;
    }

    // 更新 booking slot 的状态
    await prisma.booking_Slot.update({
      where: { id: order.booking_SlotId },
      data: {
        status: new_booking_slot_status
      }
    });
    res.json(msgBody("更新信息成功"));
  } catch (err) {
    res.status(500).json(msgBody("更新信息失败"));
  };
};