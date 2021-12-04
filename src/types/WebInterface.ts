import Prisma from "@prisma/client";

export namespace WebInterface {
  export type RoomList = Prisma.Room_List[];
  export type Orders = Prisma.User_Orders[];
  // export type StudentList = Prisma.Student[];

  // export type TeacherList = Prisma.Teacher[];

  // export interface requestInfo {
  //   学生信息: {
  //     姓名: string;
  //     学号: number;
  //     专业: string;
  //     院系: string;
  //     学科门类: string;
  //     是否双学位: boolean;
  //     双学位国际专业: string;
  //     双学位所在院系: string;
  //   };
  //   老师信息: {
  //     姓名: string;
  //     职称: string;
  //     工号: number;
  //     所在院系: string;
  //     是否本校老师: boolean;
  //   };
  //   论文信息: {
  //     题目: string;
  //     类别: "工程设计类或理论研究" | "论文类" | "其它" | "";
  //     社会实践: boolean;
  //   };
  // }
}
