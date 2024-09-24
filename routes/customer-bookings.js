import express from "express";
import { room } from "./book-room.js";

const customerBookingRouter = express.Router();
/* CustomerName is passed in the QueryParams details for that particular 
Customer is Fetched */
customerBookingRouter.get("/", (req, res) => {
    const customerName = req.query.CustomerName;
    let name = room.filter((val) => val.CustomerName === customerName);
    try {
        if (name.length !== 0) {
            res.send({ msg: `Booking Page Details by ${customerName}`, name });
        } else {
            res.send({
                msg: "Not same as Format or CustomerName not Available So all Data fetched",
                room,
            });
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

export default customerBookingRouter;