import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";

import format from "date-fns/format";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { getEventsByRange } from "../api/index";

const DateRangeComp = ({ setEvents }) => {
  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(range);
    const { events } = await getEventsByRange(range);
    console.log(events);
    setEvents(events);
  };

  return (
    <form onSubmit={handleSubmit} className="row mb-5 mx-0">
      <div className="col-md-9 p-2 mb-3">
        <input
          value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(
            range[0].endDate,
            "MM/dd/yyyy"
          )}`}
          readOnly
          className="form-control"
          onClick={() => setOpen((open) => !open)}
        />

        <div ref={refOne}>
          {open && (
            <DateRange
              onChange={(item) => setRange([item.selection])}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={1}
              direction="horizontal"
              //   className="calendarElement"
            />
          )}
        </div>
      </div>
      <div className="col-md-3 p-2">
        <button className="btn bg-primary text-white" type="submit">
          Get Appointments
        </button>
      </div>
    </form>
  );
};

export default DateRangeComp;
