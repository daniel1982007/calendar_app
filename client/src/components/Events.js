import { useState, useEffect } from "react";
import { getEvents } from "../api/index";
import DateRangeComp from "./DateRangeComp";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const get_all_events = async () => {
      const result = await getEvents();
      console.log(result);
      setEvents(result.events);
    };
    get_all_events();
  }, []);

  return events.length ? (
    <div className="p-5">
      <DateRangeComp setEvents={setEvents} />
      <h2 className="fw-lighter text-center mb-5">
        All The Booked Appointments Are Listed Below
      </h2>
      <div className="row m-0">
        {events.map((event, i) => (
          <div key={i} className="col-md-6">
            <div className="border border-dark rounded-2 my-2 p-3">
              <h4 className="fw-bold text-dark mb-4">Appointment Details</h4>
              <h5 className="fw-lighter">
                Start At Local Time:{" "}
                {new Date(event.booking_slot).toLocaleString("en-US", {
                  timeZone: event.timeZone,
                })}
              </h5>
              <h5 className="fw-lighter">Duration: {event.duration}</h5>
              <h6 className="fw-bold mt-4">{event.timeZone}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Empty</div>
  );
};

export default Events;
