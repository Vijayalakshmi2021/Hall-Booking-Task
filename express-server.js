import express from "express";
import hallRouter from "./routes/create-room.js";
import bookingRouter from "./routes/book-room.js";
import roomRouter from "./routes/rooms.js";
import customerRouter from "./routes/customers.js";
import customerBookingRouter from "./routes/customer-bookings.js";

const app = express();

app.use(express.json());

app.use("/create-room", hallRouter);
app.use("/book-room", bookingRouter);
app.use("/rooms", roomRouter);
app.use("/customers", customerRouter);
app.use("/customer-bookings", customerBookingRouter);

app.listen(2000, () => {
    console.log("Server is running on port 2000");
});