import express from "express";
import createRandomString from "../randomname.js";
import { hall } from "./create-room.js";

const bookingRouter = express.Router();
let room = [];
let notBooked = [];
let cusDetails = [];
let alreadyBooked = []; //Details of already booked Rooms available
//RoomID is passed as the Params indicating exact selection of Room
bookingRouter.post("/:RoomID", (req, res) => {
    const RoomId = req.params.RoomID;
    const bookingDate = Date().toString();

    //Function to Set Room for same Room ID
    const setRoomName = () => {
        let check = false;
        let nameRoom = "";
        if (room.length !== 0) {
            let roomName = room.filter((val) => val.RoomId === RoomId);
            check = true;
            for (let names of roomName) {
                return (nameRoom = names.RoomName);
            }
        }
        if (room.filter((val) => val.RoomId !== RoomId)) {
            return (nameRoom = createRandomString());
        }
    };

    const data = {
        ...req.body,
        "RoomName": setRoomName(),
        "RoomId": RoomId, //RoomID is assingned to the Customer Who Booked the Room
        "Booking Status": "Booked",
        "Booking Date": bookingDate,
        "BookingID": Date.now().toString(),
    };
    // Extracted Customer details with RoomName to show in "/customers" API

    let remainingRooms = hall.filter((val) => val.RoomID !== RoomId);
    //Rooms which are not booked available in"notBooked[]"
    notBooked.push(remainingRooms);

    /* At Same Date and Time rooms will not be booked
    There may be a simple logic discrepancy with correct time format this can 
    be addressed, If {"Starttime" : "time PM", "Endtime" : "time PM"} not in 
    this format Room will get booked at same Date */

    let date = req.body.Date;
    let start = req.body.Starttime;
    let end = req.body.Endtime;
    let bookedRoom = room.filter((val) => val.RoomId === RoomId);
    let checkDate = bookedRoom.filter((val) => val.Date === date);
    let checkStart = "";
    let checkEnd = "";
    for (let startTime of checkDate) {
        checkStart = startTime.Starttime;
        checkEnd = startTime.Endtime;
    }

    try {
        let validRoom = hall.filter((val) => val.RoomID === RoomId);
        if (validRoom === undefined || null) {
            res.status(404).send({ msg: "Check URL Path or Select Valid Room" });
        }
        //Condition to passes if room doesn't booked already
        else if (
            bookedRoom.length !== 0 &&
            checkDate.length !== 0 &&
            checkStart === start &&
            checkEnd === end
        ) {
            alreadyBooked.push(bookedRoom);
            res.status(403).send({ msg: "Room Already Booked" });
        } else {
            room.push(data);
            res.send({ msg: "Room booked Successfully", room });
            //Extracted Customer details with RoomName to show in "/customers" API
            const customer = {
                ...req.body,
                "RoomName": data.RoomName,
            };
            cusDetails.push(customer);
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal server Error", error });
    }
});

export { room, notBooked, alreadyBooked, cusDetails };
export default bookingRouter;