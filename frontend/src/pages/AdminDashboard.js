import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [participants, setParticipants] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/events");
    setEvents(res.data);
  };

  const addEvent = async () => {
    await axios.post("http://localhost:5000/api/events", {
      name,
      venue,
      date,
    });
    loadEvents();
  };

  const deleteEvent = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    loadEvents();
  };

  const updateEvent = async (id) => {
    await axios.put(`http://localhost:5000/api/events/${id}`, {
      name,
      venue,
      date,
    });
    loadEvents();
  };

  const searchEvent = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/events/search?q=${search}`
    );
    setEvents(res.data);
  };

  const viewParticipants = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/events/participants/${id}`
    );
    setParticipants(res.data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Add / Update Event</h3>
      <input placeholder="Event Name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Venue" onChange={(e)=>setVenue(e.target.value)} />
      <input placeholder="Date" onChange={(e)=>setDate(e.target.value)} />

      <button onClick={addEvent}>Add Event</button>

      <br/><br/>

      <input placeholder="Search Event" onChange={(e)=>setSearch(e.target.value)} />
      <button onClick={searchEvent}>Search</button>
      <button onClick={loadEvents}>Reset</button>

      <h3>Events</h3>
      <ul>
        {events.map((event)=>(
          <li key={event._id}>
            {event.name} | {event.venue} | {event.date}

            <button onClick={()=>updateEvent(event._id)}>Update</button>
            <button onClick={()=>deleteEvent(event._id)}>Delete</button>
            <button onClick={()=>viewParticipants(event._id)}>
              Participants
            </button>
          </li>
        ))}
      </ul>

      <h3>Registered Users</h3>
      <ul>
        {participants.map((p)=>(
          <li key={p._id}>
            {p.name} - {p.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;