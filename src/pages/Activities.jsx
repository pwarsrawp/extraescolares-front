import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { fetchAll } from "../functions/api.calls";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;

function Activities() {
  const [activities, setActivities] = useState([]);
  const { isLoggedIn, user, setUserUpdate } = useContext(AuthContext);

  useEffect(() => {
    const fetchActivities = async () => {
      const activitiesData = await fetchAll(`${api_url}/activities`);
      setActivities(activitiesData);
    };
    fetchActivities();
  }, []);

  return !activities
    ? <h1>Cargando datos...</h1>
    : (
      <div className="activities-wrapper">
        {activities.map((activity) => {
          return (
            <div key={activity._id} className="activity-item">
              <h3>{activity.name}</h3>
              <Link to={`/activities/${activity._id}`}><Button variant="contained">Ver</Button></Link>
              <Link><Button variant="contained">Apuntarme</Button></Link>
            </div>
          )
        })}
      </div>
    )
}

export default Activities;
