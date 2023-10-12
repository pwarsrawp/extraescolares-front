import { useEffect, useState } from "react";
import { fetchAll } from "../functions/api.calls";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const api_url = import.meta.env.VITE_API_URL;

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const activitiesData = await fetchAll(`${api_url}/activities`);
      setActivities(activitiesData);
    };
    fetchActivities();
  }, []);

  return !activities ? (
    <h1>Cargando datos...</h1>
  ) : (
    <div className="activities-wrapper">
      {activities.map((activity) => {
        return (
          <div key={activity._id} className="activities-item">
            <h3>{activity.name}</h3>
            <div className="activities-buttons">
              <Link to={`/activities/${activity._id}`}>
                <Button color="primary">
                  <FormatListBulletedIcon />
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Activities;
