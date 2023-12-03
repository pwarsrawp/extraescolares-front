import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/auth.context";
import { Navigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { updateOne } from "../functions/api.calls";
const api_url = import.meta.env.VITE_API_URL;

function ActivityDetails() {
  const [activity, setActivity] = useState(null);
  const [listToUpdate, setListToUpdate] = useState([]);
  const [name, setName] = useState('');
  // const [waitingList, setWaitingList] = useState(null);
  const { activityId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getOneActivity = async () => {
      try {
        const oneActivity = await axios.get(
          `${api_url}/activities/${activityId}`
        );
        // const waitingList = await axios.get(`${api_url}/lists/${activityId}`);
        setActivity(oneActivity.data);
        // setWaitingList(waitingList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOneActivity();
  }, [activityId, listToUpdate]);
// break point
  async function handleAddToListSubmit(event) {
    event.preventDefault();
    setListToUpdate([...activity.list])
    listToUpdate.push({name: name, responsible: user})
    console.log(listToUpdate)
    await updateOne(`${api_url}/activities/${activityId}`, {list: listToUpdate})
  }

  return !activity ? (
    <Spinner />
  ) : (
    <div className="activity-details-wrapper">
      <h1>{activity.name}</h1>
      <br />
      <h3>
        Ciclo: <span>{activity.cicle}</span>
      </h3>
      <h3>
        Nivel: <span>{activity.level}</span>
      </h3>
      <h3>
        Nº días: <span>{activity.numberDays}</span>
      </h3>
      <h3>
        Días: <span>{activity.daysWeek}</span>
      </h3>
      <h3>
        Horario: <span>{activity.schedule}</span>
      </h3>
      <h3>
        Precio socios: <span>{activity.memberPrice} €/mes</span>
      </h3>
      <h3>
        Precio no socios: <span>{activity.noMemberPrice} €/mes</span>
      </h3>
      <h3>
        Empresa: <span>{activity.company}</span>
      </h3>
      <h3>
        Nº plazas: <span>{activity.slots}</span>
      </h3>
      {user?.isAdmin && (
        <div className="activity-details-buttons">
          <button>Editar</button>
          <button>Borrar</button>
        </div>
      )}
      <br />
      <br />
      <div>
        <form onSubmit={handleAddToListSubmit}>
          <TextField
          type="name"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          id="outlined-basic"
          label="Nombre de alumno"
          variant="outlined"
        />
          <Button color="primary" variant="contained" type="submit">
          <PlaylistAddIcon />
        </Button>
        </form>
        
      </div>
      <br />
      <br />
      <div className="activity-details-waiting-list">
        <div style={{ display: "flex", gap: "10px" }}>
          <h3>Lista de espera</h3>
        </div>

        <br />
        {activity.list.map((student, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "20px", marginBottom: "15px" }}
          >
            <h2>{index + 1}</h2>
            <p>{student.name}</p>
            <p>{student.responsible}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityDetails;
