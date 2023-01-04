import { useEffect, useState } from "react";
import FreeSlots from "./FreeSlots";
import DatePicker from "./DatePicker";
import { add_new_event, get_free_slots } from "../api/index";
import moment from "moment";

const Home = () => {
  const [date, setDate] = useState("");
  const [freeSlots, setFreeSlots] = useState([]);
  const [timeZone, setTimeZone] = useState("UTC");
  const [chosenSlot, setChosenSlot] = useState({});
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    //default date is today
    const d = moment().format().slice(0, 10);
    setDate(d);
    //get current date free slots
    const get_all_free_slots = async () => {
      const { frees } = await get_free_slots(d);
      console.log(frees);
      setFreeSlots(frees);
    };
    get_all_free_slots();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create an event with chosen slot
    console.log(chosenSlot);
    const new_event = await add_new_event(chosenSlot);
    console.log(new_event);
    const { frees } = await get_free_slots(date);
    console.log(frees);
    setFreeSlots(frees);
    setSelectedSlot("");
  };

  console.log(date);

  return (
    <div className="container-sm mt-3">
      <form onSubmit={handleSubmit}>
        <div className="row mx-0 my-5">
          <div className="col-md-6 px-5 my-5">
            <DatePicker
              date={date}
              setDate={setDate}
              setSelectedSlot={setSelectedSlot}
              setFreeSlots={setFreeSlots}
            />
            <div className="p-3">
              <h4 className="fw-lighter">Please Choose A Timezone</h4>
              <select
                className="w-100 p-2 form-control"
                defaultValue="UTC"
                onChange={(e) => {
                  setTimeZone(e.target.value);
                  setSelectedSlot("");
                }}
              >
                <option value="Asia/Dubai">Dubai</option>
                <option value="Europe/Amsterdam">Amsterdam</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="America/Argentina/Buenos_Aires">
                  Buenos Aires
                </option>
                <option value="Asia/Kolkata">Mumbai</option>
                <option value="America/Los_Angeles">Los Angeles</option>
                <option value="US/Eastern">New York</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div>
              <h4> </h4>
            </div>
          </div>
          <FreeSlots
            date={date}
            freeSlots={freeSlots}
            timeZone={timeZone}
            setChosenSlot={setChosenSlot}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        </div>
      </form>
    </div>
  );
};

export default Home;
