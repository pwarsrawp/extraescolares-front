import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { getActivities } from '../functions/activities';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const activitiesData = await getActivities();
      setActivities(activitiesData);
    };
    loadData();
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
                  <Button color='primary' href={`/actividades/${activity._id}`}>
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
