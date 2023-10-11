import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { fetchAll } from "../functions/api.calls";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const api_url = import.meta.env.API_URL;

function Activities() {
  const [activities, setActivities] = useState([]);
  const { isLoggedIn, user, setUserUpdate } = useContext(AuthContext);

  useEffect(() => {
    const fetchActivities = async () => {
      const activitiesData = await fetchAll(`https://extraescolares-back.adaptable.app/activities`);
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
              <Button variant="contained">
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
