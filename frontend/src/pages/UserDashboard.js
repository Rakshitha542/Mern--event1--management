import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/events");
    setEvents(res.data);
  };

  const register = async (id) => {
    await axios.post(
      `http://localhost:5000/api/events/register/${id}`,
      { userId: user._id }
    );
    alert("Registered successfully");
  };

  const searchEvent = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/events/search?q=${search}`
    );
    setEvents(res.data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <br/><br/>

      <input
        placeholder="Search Event"
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button onClick={searchEvent}>Search</button>
      <button onClick={loadEvents}>Reset</button>

      <h3>Available Events</h3>
      <ul>
        {events.map((event)=>(
          <li key={event._id}>
            {event.name} | {event.venue} | {event.date}

            <button onClick={()=>register(event._id)}>
              Register
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDashboard;