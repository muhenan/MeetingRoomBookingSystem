import { PrismaClient, Room_List } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import { msgBody } from "../utils/msgBody";
import { WebInterface } from "../types/WebInterface";

const prisma = new PrismaClient();

export const importRoom = async (req: Request, res: Response,) => {
  console.log("now import rooms");
  const payload: WebInterface.RoomList = req.body;
  const errList = [];
  const successList = [];
  for (let i = 0; i < payload.length; i++) {
    const room = payload[i];
    try {
      await prisma.room_List.create({
        data: room
      });
      successList.push(room);
    } catch (err) {
      console.log(err);
      errList.push(room);
    }
  }
  res.json(
    msgBody(
      `添加会议室完成，成功${successList.length}个，失败${errList.length}个`,
      { success: successList, fail: errList }
    )
  );
};

export const deleteRoom = async (req: Request, res: Response,) => {
  console.log("now delete room");
  try {
    await prisma.room_List.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(msgBody("删除会议室成功"));
  } catch (err) {
    res.status(404).json(msgBody("会议室不存在，无法删除"));
  }
};


export const getRoom = async (req: Request, res: Response,) => {
  const allRoomList = await prisma.room_List.findMany();
  res.json(msgBody("获取所有会议室成功", {
    roomList: allRoomList
  }));
};

export const updateRoom = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload: Room_List = req.body;
  delete payload.id;
  try {
    await prisma.room_List.update({ where: { id: id }, data: payload });
    res.json(msgBody("更新信息成功"));
  } catch (err) {
    res.status(500).json(msgBody("更新信息失败"));
  }
};