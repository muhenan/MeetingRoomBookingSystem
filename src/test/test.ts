import { time } from "console";

function test() {
  console.log("Hello");

};

test();

const myDate = new Date()

// console.log(myDate);
console.log(myDate.toString());
console.log(myDate.toLocaleDateString());
console.log(myDate.toLocaleTimeString());
console.log(myDate.getFullYear());
console.log(myDate.getMonth());
console.log(myDate.getDate());
console.log(myDate.getHours());

const date1 = new Date("2021/6/3");
const date2 = new Date("2021/6/4");
const date3 = new Date("2021/6/3");

/*

数据库中 date 的格式:
2021/12/28
2022/1/2

time 的格式，只记录小时，用 0 - 23 的整数

*/

const data1TimeStamp = Date.parse(date1.toLocaleDateString());
const data2TimeStamp = Date.parse(date2.toLocaleDateString());
const data3TimeStamp = Date.parse(date3.toLocaleDateString());

// console.log(data1.toString());
// console.log(data1.toLocaleDateString());
// console.log(data1.toLocaleTimeString());
// console.log(data1.getFullYear());
// console.log(data1.getMonth());
// console.log(data1.getDate());
// console.log(data1.getHours());

/*

if(小一天){
  可预定
} else if (同一天，时辰小) {
  可预定
}

*/



console.log(data1TimeStamp);
console.log(data2TimeStamp);
console.log(data3TimeStamp);

const date4 = new Date("January 12,2006 0:19:35");
console.log(date4.toString());
console.log(date4.toLocaleDateString());
console.log(date4.getHours());