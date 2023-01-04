import { useState } from "react";
import DateTimePicker from "react-datetime-picker";

const AddEvent = () => {
  const [duration, setDuration] = useState("");
  const [value, handleDatetime] = useState(new Date());

  // const handleDatetime = (e) => {
  //   e.preventDefault();
  //   setDatetime(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const d = new Date(value);
    const slot = d.getTime();
    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    const res = await fetch("http://localhost:8000/add_event", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        slot,
        duration: duration + "min",
        timeZone: "US/Eastern",
        date,
      }),
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="container-sm mt-5">
      <form onSubmit={handleSubmit} className="row m-0">
        <div className="col-md-6 p-3">
          <h4 className="fw-lighter">Choose a date</h4>
          <DateTimePicker
            onChange={handleDatetime}
            value={value}
            className="form-control mb-4"
          />
          <div>
            <h4 className="fw-lighter">Set a duration</h4>
            <input
              className="form-control mb-4"
              type="text"
              placeholder="Duration in Minutes"
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 p-3 p-md-5 d-flex align-items-center justify-content-center">
          <button className="btn bg-primary text-white w-100" type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
