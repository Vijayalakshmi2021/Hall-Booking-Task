import express from "express";
import { cusDetails } from "./book-room.js";

const customerRouter = express.Router();
customerRouter.get("/", (req, res) => {
    //cusDetails comes with Request body with the RoomName
    //Room name is Randomly generated to avoid confusions in processing

    try {
        res.send({ msg: "Customer details for Booked Room", cusDetails });
    } catch (error) {
        res.send({ msg: "Error Fetching from Server", error });
    }
});

export default customerRouter;