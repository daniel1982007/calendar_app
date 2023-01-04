import express from "express";
import { getFreeSlots } from "../controller/slots.js";
import {
  getEvents,
  addAnEvent,
  getEventsByRange,
} from "../controller/events.js";

const router = express.Router();

//events
router.get("/events", getEvents);
router.post("/add_event", addAnEvent);
router.post("/events/by_range", getEventsByRange);

//free slots
router.get("/slots/:date", getFreeSlots);

export default router;
