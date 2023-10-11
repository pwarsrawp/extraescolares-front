import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postOne } from "../functions/api.calls";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
const api_url = import.meta.env.API_URL;

function ActivityCreate() {
  const [name, setName] = useState("");
  const [cicle, setCicle] = useState("");
  const [level, setLevel] = useState("");
  const [numberDays, setNumberDays] = useState("");
  const [daysWeek, setDaysWeek] = useState("");
  const [schedule, setSchedule] = useState("");
  const [memberPrice, setMemberPrice] = useState("");
  const [noMemberPrice, setNoMemberPrice] = useState("");
  const [company, setCompany] = useState("");
  const [slots, setSlots] = useState("");

  const navigate = useNavigate();

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    try {
      await postOne(`${api_url}/activities`, {
        name,
        cicle,
        level,
        numberDays,
        daysWeek,
        schedule,
        memberPrice,
        noMemberPrice,
        company,
        slots,
      });
      navigate("/activities");
    } catch (error) {
      console.log("An error ocurred creating an activity: ", error);
    }
  };

  return (
    <div id="activity-create">
      <h1>Añadir actividad:</h1>
      <form onSubmit={handleCreateActivity}>
        <TextField
          value={name}
          required
          onChange={(event) => {
            setName(event.target.value);
          }}
          id="outlined-basic"
          label="Nombre de actividad"
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Ciclo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cicle}
            label="Ciclo"
            onChange={(event) => {
              setCicle(event.target.value);
            }}
          >
            <MenuItem value={'Infantil'}>Infantil</MenuItem>
            <MenuItem value={'Primaria'}>Primaria</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={level}
          required
          onChange={(event) => {
            setLevel(event.target.value);
          }}
          id="outlined-basic"
          label="Nivel"
          variant="outlined"
          helperText='Ejemplo: 1º - 6º primaria'
        />
        <TextField
          value={numberDays}
          required
          onChange={(event) => {
            setNumberDays(event.target.value);
          }}
          id="outlined-basic"
          label="Nº de días/semana"
          variant="outlined"
        />
        <TextField
          value={daysWeek}
          required
          onChange={(event) => {
            setDaysWeek(event.target.value);
          }}
          id="outlined-basic"
          label="Días de la semana"
          variant="outlined"
          helperText='Ejemplo: L y X'
        />
        <TextField
          value={schedule}
          required
          onChange={(event) => {
            setSchedule(event.target.value);
          }}
          id="outlined-basic"
          label="Horario"
          variant="outlined"
          helperText='Ejemplo: 16:00 - 17:00'
        />
        <TextField
          value={memberPrice}
          required
          onChange={(event) => {
            setMemberPrice(event.target.value);
          }}
          id="outlined-basic"
          label="Precio socios"
          variant="outlined"
          helperText='Ejemplo: 20'
        />
        <TextField
          value={noMemberPrice}
          required
          onChange={(event) => {
            setNoMemberPrice(event.target.value);
          }}
          id="outlined-basic"
          label="Precio no socios"
          variant="outlined"
          helperText='Ejemplo: 26'
        />
        <TextField
          value={company}
          required
          onChange={(event) => {
            setCompany(event.target.value);
          }}
          id="outlined-basic"
          label="Empresa"
          variant="outlined"
          helperText='Ejemplo: 26'
        />
        <TextField
          value={slots}
          required
          onChange={(event) => {
            setSlots(event.target.value);
          }}
          id="outlined-basic"
          label="Nº Plazas"
          variant="outlined"
          helperText='Ejemplo: 15'
        />
        {/* <TextField
          value={memberNumber}
          onChange={(event) => {
            setMemberNumber(event.target.value);
          }}
          id="outlined-basic"
          label="Nº de socio (si procede)"
          variant="outlined"
        />
        <TextField
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          id="outlined-basic"
          label="Contraseña"
          variant="outlined"
        />         */}
        <Button type="submit" variant='contained'>Enviar</Button>
      </form>
    </div>
  );
}

export default ActivityCreate;
