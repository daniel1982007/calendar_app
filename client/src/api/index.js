// const base_url = "https://deploy-calendar-api.web.app";
const base_url = "http://localhost:8000";

export const get_free_slots = async (date_str) => {
  const res = await fetch(base_url + `/slots/${date_str}`);
  const free_slots = await res.json();
  return free_slots;
};

export const add_new_event = async ({ slot, duration, date, timeZone }) => {
  const res = await fetch(base_url + "/add_event", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      slot,
      timeZone,
      date,
      duration,
    }),
  });
  const event = await res.json();
  return event;
};

export const getEvents = async () => {
  const res = await fetch(base_url + "/events");
  const events = await res.json();
  return events;
};

export const getEventsByRange = async (range) => {
  console.log(range);
  const res = await fetch(base_url + "/events/by_range", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ range }),
  });
  const events = await res.json();
  return events;
};
