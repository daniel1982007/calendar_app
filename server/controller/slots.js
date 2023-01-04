import { getDocs, collection } from "firebase/firestore";
import db from "../db.js";

export const default_setting = {
  start_time: "8:00 AM",
  end_tiem: "5:00 PM",
  slot_duration: 30,
  timezone: "US/Eastern",
};

export const getFreeSlots = async (req, res, next) => {
  const { date } = req.params;
  console.log(date);
  try {
    // find all the slots from the day
    const utc_start = new Date(
      date + " " + default_setting.start_time + "-0500"
    );
    const utc_end = new Date(date + " " + default_setting.end_tiem + "-0500");

    // console.log((end - start) / (30 * 60000));
    const period_ms = 30 * 60 * 1000;
    const slots_amount = (utc_end - utc_start) / period_ms;

    const starts = [];
    for (let i = 0; i < slots_amount; i++) {
      starts.push(utc_start.getTime() + period_ms * i);
    }

    // filter out all the slots that are already taken
    // get all the appointments from databse
    const events = await getDocs(collection(db, "events"));
    console.log(events.docs.map((doc) => doc.data()));
    const _events = events.docs
      .map((doc) => doc.data())
      .map((ev) => {
        console.log(ev);
        return {
          event_start: ev.booking_slot,
          event_end:
            ev.booking_slot + parseInt(ev.duration.slice(0, -3)) * 60 * 1000,
        };
      });
    // start => {static_start: 167157000, static_end: 167168000} slot => {start: 167158000, end: 167163000}
    const _starts = starts.map((start) => ({
      static_start: start,
      static_end: start + 30 * 60 * 1000,
    }));

    // 2 demension array
    console.log(_starts, _events);

    // events array empty
    // events array not empty
    let frees = [];
    for (let slot of _starts) {
      const is_free = _events.every(
        (ev) =>
          ev.event_start >= slot.static_end || ev.event_end <= slot.static_start
      );
      console.log(is_free);
      if (is_free) {
        frees.push({ ...slot, free: true });
      } else {
        frees.push({ ...slot, free: false });
      }
    }
    console.log(frees);

    // frees = frees.map((free) => free.static_start);
    // const starts_utc_str = starts.map((start) => new Date(start).toISOString());
    res.status(200).json({ frees });

    // find all the free slots
    // find free slots which later than current time
  } catch (error) {
    console.log(error);
  }
};
