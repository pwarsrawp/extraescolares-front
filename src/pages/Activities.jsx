import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { createActivity, deleteActivity, getActivities } from '../functions/activities';
import NewActivityModal from '../components/modals/NewActivityModal';
import useAuth from '../hooks/useAuth';
import { ButtonOutlined } from '../components/Templates';
import DeleteActivityModal from '../components/modals/DeleteActivityModal';

function Activities() {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);
  const [showDeleteActivityModal, setShowDeleteActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const activitiesData = await getActivities();
    setActivities(activitiesData);
  };

  const onCreateActivity = async (activityData) => {
    await createActivity(activityData);
    setShowNewActivityModal(false);
    loadData();
  };
  const onClickDeleteActivity = (activity) => {
    setSelectedActivity(activity)
    setShowDeleteActivityModal(true)
  }

  const onDeleteActivity = async () => {    
    await deleteActivity(selectedActivity._id);
    setShowDeleteActivityModal(false);
    setSelectedActivity({})
    loadData();
  };

  return !activities ? (
    <h1>Cargando datos...</h1>
  ) : (
    <>
      <NewActivityModal modalState={showNewActivityModal} handleModal={setShowNewActivityModal} onCreateActivity={onCreateActivity} />
      <DeleteActivityModal modalState={showDeleteActivityModal} handleModal={setShowDeleteActivityModal} selectedActivity={selectedActivity} onDeleteActivity={onDeleteActivity} />
      <Stack spacing={1}>
      <Stack direction='row' justifyContent='end'>
        {user?.isAdmin && <ButtonOutlined onClick={() => setShowNewActivityModal(true)}>Nueva actividad</ButtonOutlined>}
      </Stack>
      <Paper>
        <Table>
          <TableBody>
            {activities?.map((activity) => {
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
                    {user?.isAdmin && <Button color='error' onClick={() => onClickDeleteActivity(activity)}>
                      Eliminar
                    </Button>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper></Stack>
    </>
  );
}

export default Activities;
