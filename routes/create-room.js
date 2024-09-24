import express from "express";

let hall = [];
const hallRouter = express.Router();

hallRouter.post("/", (req, res) => {
    let data = {
        ...req.body,
        //Unique ID for the room in creation of Room
        //When Customer selects a room this RoomID is passed as the Params
        "RoomID": Date.now().toString(),
    };

    try {
        hall.push(data);
        res.send({ msg: "Hall Created Successfully", hall });
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

export default hallRouter;
export { hall };