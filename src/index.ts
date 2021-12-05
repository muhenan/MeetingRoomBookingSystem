import express, { Response, Request, json } from "express";
import room from "./router/room";
import order from "./router/order";
import booking_slot from "./router/book_slot"

const app = express();

app.use(express.json())

app.use("/api/room", room);
app.use("/api/order", order);
app.use("/api/booking_slot", booking_slot);

app.get('/', (req, res) => {
  res.send('Hello World! I\'m Allen, Express')
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
});