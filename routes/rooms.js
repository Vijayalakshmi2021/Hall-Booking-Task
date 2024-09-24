import express from "express";
import { room, alreadyBooked } from "./book-room.js";

const roomRouter = express.Router();
const rooms = [];
//Only Booked Rooms will be fetched from this API request
roomRouter.get("/", (req, res) => {
    try {
        for (let data of room) {
            rooms.push(data);
        }
        res.send({ msg: "Below Booked Rooms", rooms });
    } catch (error) {
        res.send({ msg: "Internal Server Error", error });
    }
});
export default roomRouter;