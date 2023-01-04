import db from "../db.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { default_setting } from "./slots.js";

export const getEvents = async (req, res, next) => {
  try {
    const result = await getDocs(collection(db, "events"));
    const events = result.docs.map((doc) => doc.data());
    res.status(200).json({ events });
  } catch (error) {
    console.log(error);
  }
};

export const addAnEvent = async (req, res, next) => {
  try {
    const { slot, timeZone, date, duration } = req.body;
    const _duration = parseInt(duration) * 60 * 1000;
    const start = slot;
    const end = slot + _duration;
    console.log(slot, timeZone, date, duration);

    //compare with all events
    const events = await getDocs(collection(db, "events"));
    const _events = events.docs.map((doc) => doc.data());
    console.log(_events);

    const is_new_event_crossed = _events.some((event) => {
      const s = parseInt(event.booking_slot);
      const e = s + parseInt(event.duration) * 60 * 1000;
      return (
        (start > s && start < e) ||
        (end > s && end < e) ||
        (start === s && end === e) ||
        (start <= s && end >= e)
      );
    });

    console.log(is_new_event_crossed);

    //start earlier than first slot or end is later than last slot
    const out_of_range =
      start <
        new Date(date + " " + default_setting.start_time + "-0500").getTime() ||
      end > new Date(date + " " + default_setting.end_tiem + "-0500").getTime();
    console.log(out_of_range);
    //duration is any
    const is_duration_valid = duration === "";
    console.log(is_duration_valid);

    if (is_new_event_crossed) {
      res.status(422).json({
        message: "Appointment at this time already exists",
        timestamp: start,
        timeZone,
        date,
        duration,
      });
    } else {
      // slot - timestamp
      const new_event = await addDoc(collection(db, "events"), {
        booking_slot: slot,
        timeZone,
        duration,
      });
      // how to retrieve the new_event?

      res.status(200).json({ message: "added an new event" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getEventsByRange = async (req, res, next) => {
  const { range } = req.body;
  console.log(range);
  // node returns utc time
  const start_from = new Date(range[0].startDate).getTime();
  const end_till = new Date(range[0].endDate).getTime();

  const events_raw = await getDocs(collection(db, "events"));
  const events = events_raw.docs.map((doc) => doc.data());

  const result = events.filter((e) => {
    console.log(e.booking_slot, start_from, end_till);
    return e.booking_slot >= start_from && e.booking_slot <= end_till;
  });
  res.status(200).json({ events: result });
};
