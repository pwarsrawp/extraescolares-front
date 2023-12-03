import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchAll } from '../functions/api.calls';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
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
    <Paper>
      <Table>
        <TableBody>
          {activities.map((activity) => {
            return (
              <TableRow key={uuidv4()}>
                <TableCell>
                  <Typography variant='body1'>{activity.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body1'>{activity.level}</Typography>
                </TableCell>
                <TableCell>
                  <Button color='primary' href={`/activities/${activity._id}`}>
                    Detalles
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Activities;
