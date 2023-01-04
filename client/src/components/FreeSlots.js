const FreeSlots = ({
  date,
  freeSlots,
  timeZone,
  setChosenSlot,
  selectedSlot,
  setSelectedSlot,
}) => {
  const date_str = new Date(date).toDateString().replace(/ /g, ", ");

  const handleClick = (slot) => {
    setSelectedSlot(slot);
    // set chosen slot
    setChosenSlot({ slot, date, timeZone, duration: "30min" });
  };

  return (
    <div className="col-md-6 px-5">
      <h5 className="fw-light text-center mb-5">
        Available Starting times for <strong>{date_str}</strong>
      </h5>
      <div className="row m-0">
        {freeSlots.length ? (
          freeSlots.map((slot, i) => (
            <button
              type="button"
              key={i}
              onClick={() => handleClick(slot.static_start)}
              className={`col-md-5 ${
                slot.static_start === selectedSlot
                  ? "text-white bg-primary border border-primary"
                  : "bg-light border border-dark"
              } ${
                slot.free ? "text-dark" : "text-secondary border-0"
              } d-block rounded-2 mb-2 px-3 py-2 mx-auto`}
              disabled={slot.free ? false : true}
            >
              {
                new Date(slot.static_start)
                  .toLocaleString("en-US", { timeZone })
                  .split(",")[1]
              }{" "}
              {!slot.free && "Booked"}
            </button>
          ))
        ) : (
          <h3 className="fw-lighter text-center">
            No Availability for Appointment, Please Choose An Another Day.
          </h3>
        )}
      </div>
      <button
        type="submit"
        className={`d-block mt-5 mx-auto px-5 py-2 text-white border rounded-2 ${
          selectedSlot ? "bg-primary" : "#188bf6"
        }`}
        style={{ backgroundColor: selectedSlot ? "" : "#188bf6" }}
      >
        select date
      </button>
    </div>
  );
};

export default FreeSlots;
