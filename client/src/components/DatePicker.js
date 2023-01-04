import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { get_free_slots } from "../api";

const DatePicker = ({ date, setDate, setSelectedSlot, setFreeSlots }) => {
  // date state
  //   const [calendar, setCalendar] = useState("");

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // set current date on component load
    // setDate(format(new Date(), "MM/dd/yyyy"));
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // on date change, store date in state
  const handleSelect = async (date) => {
    console.log(date);
    // console.log(format(date, 'MM/dd/yyyy'))
    // setCalendar(format(date, "MM/dd/yyyy"));
    setDate(format(date, "yyyy-MM-dd"));
    setSelectedSlot("");
    const { frees } = await get_free_slots(format(date, "yyyy-MM-dd"));
    console.log(frees);
    setFreeSlots(frees);
  };

  return (
    <div className="p-3">
      <h4 className="fw-lighter mb-2">Please Choose A Date</h4>
      <input
        value={date}
        readOnly
        className="form-control mb-2"
        onClick={() => setOpen((open) => !open)}
      />
      <div ref={refOne}>
        {open && <Calendar date={new Date()} onChange={handleSelect} />}
      </div>
    </div>
  );
};

export default DatePicker;
