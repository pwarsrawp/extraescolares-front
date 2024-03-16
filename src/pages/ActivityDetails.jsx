import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from '@mui/material';
import Spinner from '../components/Spinner';
import { addToCurrentList, addToWaitingList, getActivity, removeFromCurrentList, removeFromWaitingList, resetCurrentList, resetWaitingList, updateActivity } from '../functions/activities';
import { getStudentsByUserId } from '../functions/students';
import useAuth from '../hooks/useAuth';
import WaitingListStudentCard from '../components/WaitingListStudentCard';
import ResetListModal from '../components/modals/ResetListModal';
import AddToCurrentListModal from '../components/modals/AddToCurrentListModal';
import AddToWaitingListModal from '../components/modals/AddToWaitingListModal';
import RemoveFromCurrentListModal from '../components/modals/RemoveFromCurrentListModal';
import RemoveFromWaitingListModal from '../components/modals/RemoveFromWaitingListModal';
import CurrentListStudentCard from '../components/CurrentListStudentCard';
import { ButtonOutlined } from '../components/Templates';
import EditActivityModal from '../components/modals/EditActivityModal';

const InfoTitle = ({ children }) => {
  return <Typography variant='body1'>{children}</Typography>;
};

const InfoContent = ({ children }) => {
  return <Typography variant='body1'>{children}</Typography>;
};

const ListHeaderText = ({ children }) => {
  return (
    <Typography variant='subtitle1' fontWeight='600'>
      {children}
    </Typography>
  );
};

const InfoStack = styled(Stack)({
  paddingBottom: 20,
});

function ActivityDetails() {
  const { activityId } = useParams();
  const { user, isLoading } = useAuth();
  const [activity, setActivity] = useState({});
  const [waitingList, setWaitingList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [showResetListModal, setShowResetListModal] = useState(false);
  const [resetListType, setResetListType] = useState(null);
  const [showAddToCurrentListModal, setShowAddToCurrentListModal] = useState(false);
  const [showAddToWaitingListModal, setShowAddToWaitingListModal] = useState(false);
  const [showRemoveFromWaitingListModal, setShowRemoveFromWaitingListModal] = useState(false);
  const [showRemoveFromCurrentListModal, setShowRemoveFromCurrentListModal] = useState(false);
  const [showEditActivityModal, setShowEditActivityModal] = useState(false);

  const getActivityData = async () => {
    try {
      const activityData = await getActivity(activityId);
      setActivity(activityData);
      setWaitingList(activityData.waitingList);
      setCurrentList(activityData.currentList);
    } catch (error) {
      console.log(error, 'An error ocurred while fetching the activity data.');
    }
  };

  const getStudentsData = async () => {
    try {
      const studentsData = await getStudentsByUserId(user._id);
      setStudents(studentsData);
    } catch (error) {
      console.log(error, 'An error ocurred while fetching the activity data.');
    }
  };

  useEffect(() => {
    if (!isLoading) {
      getActivityData();
      getStudentsData();
    }
  }, [isLoading]);

  ///////////////////////////////////////////
  ////////// WAITING LIST ACTIONS ///////////
  ///////////////////////////////////////////
  const handleAddToWaitingList = async () => {
    await addToWaitingList({ activityId, studentId: selectedStudent._id });
    setSelectedStudent({});
    setShowAddToWaitingListModal(false);
    getActivityData();
  };

  const handleRemoveFromWaitingList = async () => {
    await removeFromWaitingList({ activityId, studentId: selectedStudent._id });
    setSelectedStudent({});
    setShowRemoveFromWaitingListModal(false);
    getActivityData();
  };

  ///////////////////////////////////////////
  ////////// CURRENT LIST ACTIONS ///////////
  ///////////////////////////////////////////
  const handleAddToCurrentList = async () => {
    await addToCurrentList({ activityId, studentId: selectedStudent._id });
    setSelectedStudent({});
    setShowAddToCurrentListModal(false);
    getActivityData();
  };

  const handleRemoveFromCurrentList = async () => {
    await removeFromCurrentList({ activityId, studentId: selectedStudent._id });
    setSelectedStudent({});
    setShowRemoveFromCurrentListModal(false);
    getActivityData();
  };

  ///////////////////////////////////////////
  ////////// ACTIONS ////////////////////////
  ///////////////////////////////////////////
  const onResetListClick = (listType) => {
    setResetListType(listType);
    setShowResetListModal(true);
  };

  const onResetList = async () => {
    if (resetListType === 'current') {
      await resetCurrentList(activityId);
    } else {
      await resetWaitingList(activityId);
    }
    setShowResetListModal(false);
    getActivityData();
  };

  const onEditActivity = async (activityData) => {
    await updateActivity(activity._id, activityData)
    setShowEditActivityModal(false)
    getActivityData()
  }

  ///////////////////////////////////////////
  ////////// RENDER /////////////////////////
  ///////////////////////////////////////////
  return !isLoading ? (
    <Stack width='100%' maxWidth='95%'>
      <EditActivityModal modalState={showEditActivityModal} handleModal={setShowEditActivityModal} onEditActivity={onEditActivity} activity={activity}/>
      <ResetListModal modalState={showResetListModal} handleModal={setShowResetListModal} onResetList={onResetList} resetListType={resetListType} />
      <AddToWaitingListModal
        modalState={showAddToWaitingListModal}
        handleModal={setShowAddToWaitingListModal}
        handleAddToWaitingList={handleAddToWaitingList}
        students={students}
        waitingList={waitingList}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />
      <AddToCurrentListModal
        modalState={showAddToCurrentListModal}
        handleModal={setShowAddToCurrentListModal}
        handleAddToCurrentList={handleAddToCurrentList}
        students={students}
        currentList={currentList}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />
      <RemoveFromWaitingListModal
        modalState={showRemoveFromWaitingListModal}
        handleModal={setShowRemoveFromWaitingListModal}
        selectedStudent={selectedStudent}
        handleRemoveFromWaitingList={handleRemoveFromWaitingList}
      />
      <RemoveFromCurrentListModal
        modalState={showRemoveFromCurrentListModal}
        handleModal={setShowRemoveFromCurrentListModal}
        selectedStudent={selectedStudent}
        handleRemoveFromCurrentList={handleRemoveFromCurrentList}
      />
      <Typography variant='h4' pb={1}>
        {activity.name}
      </Typography>
      <InfoStack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <InfoTitle>Ciclo: </InfoTitle>
          <InfoContent>{activity.cicle}</InfoContent>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <InfoTitle>Nivel:</InfoTitle>
          <InfoContent>{activity.level}</InfoContent>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <InfoTitle>Nº días:</InfoTitle>
          <InfoContent>{activity.numberDays}</InfoContent>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <InfoTitle>Días:</InfoTitle>
          <InfoContent>{activity.daysWeek}</InfoContent>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <InfoTitle>Horario:</InfoTitle>
          <InfoContent>{activity.schedule}</InfoContent>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <InfoTitle>Precio socios:</InfoTitle>
          <InfoContent>{activity.memberPrice} €/mes</InfoContent>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <InfoTitle>Precio no socios:</InfoTitle>
          <InfoContent>{activity.noMemberPrice} €/mes</InfoContent>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <InfoTitle>Empresa:</InfoTitle>
          <InfoContent>{activity.company}</InfoContent>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <InfoTitle>Nº plazas:</InfoTitle>
          <InfoContent>{activity.slots}</InfoContent>
        </Stack>
        <Stack direction='row' pt={1}>
          {user.isAdmin && (
            <ButtonOutlined onClick={() => setShowEditActivityModal(true)}>
              Editar actividad
            </ButtonOutlined>
          )}
        </Stack>
      </InfoStack>
      <Stack direction='row' alignItems='center' p={1} justifyContent='space-between'>
        <Stack direction='row' alignItems='center' p={1} justifyContent='space-between'>
          <Typography variant='h6' lineHeight={1}>
            Lista de espera
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent='center' spacing={2}>
          {user.isAdmin && (
            <Button color='error' variant='outlined' onClick={() => onResetListClick('waiting')}>
              Reiniciar lista de espera
            </Button>
          )}
          <Button color='primary' variant='outlined' onClick={() => setShowAddToWaitingListModal(true)}>
            Añadir alumno
          </Button>
        </Stack>
      </Stack>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <ListHeaderText>Posición</ListHeaderText>
              </TableCell>
              <TableCell>
                <ListHeaderText>Nombre</ListHeaderText>
              </TableCell>
              <TableCell align='right'>
                <ListHeaderText>Fecha entrada en lista</ListHeaderText>
              </TableCell>
              <TableCell align='right'>
                <ListHeaderText>Opciones</ListHeaderText>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {waitingList?.map((student, index) => (
              <WaitingListStudentCard
                key={index}
                student={student}
                index={index}
                userId={user?._id}
                setSelectedStudent={setSelectedStudent}
                setShowRemoveFromWaitingListModal={setShowRemoveFromWaitingListModal}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Stack direction='row' alignItems='center' p={1} mt={5} justifyContent='space-between'>
        <Stack direction='row' alignItems='center' p={1} justifyContent='space-between'>
          <Typography variant='h6' lineHeight={1}>
            Lista actual
          </Typography>
        </Stack>
        {user.isAdmin && (
          <Stack direction='row' justifyContent='center' spacing={2}>
            <Button color='error' variant='outlined' onClick={() => onResetListClick('current')}>
              Reiniciar lista actual
            </Button>

            <Button color='primary' variant='outlined' onClick={() => setShowAddToCurrentListModal(true)}>
              Añadir alumno
            </Button>
          </Stack>
        )}
      </Stack>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <ListHeaderText>Posición</ListHeaderText>
              </TableCell>
              <TableCell>
                <ListHeaderText>Nombre</ListHeaderText>
              </TableCell>
              <TableCell align='right'>
                <ListHeaderText>Fecha entrada en lista</ListHeaderText>
              </TableCell>
              <TableCell align='right'>
                <ListHeaderText>Opciones</ListHeaderText>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentList?.map((student, index) => (
              <CurrentListStudentCard student={student} index={index} key={uuidv4()} setSelectedStudent={setSelectedStudent} userId={user?._id} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  ) : (
    <Spinner />
  );
}

export default ActivityDetails;
