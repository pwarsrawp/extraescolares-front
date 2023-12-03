import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../context/auth.context';

import EditStudentModal from '../components/modals/EditStudentModal';
import NewStudentModal from '../components/modals/NewStudentModal';
import { fetchOne, updateOne } from '../functions/api.calls';
import LogoutButton from '../components/Logout';

const api_url = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [editModal, setEditModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [userData, setUserData] = useState();

  const fetchUserData = async () => {
    const response = await fetchOne(`${api_url}/users/${user._id}`);
    setUserData(response);
    console.log(userData);
  };

  useEffect(() => {
    if (!isLoading) {
      fetchUserData();
    }
  }, [JSON.stringify(userData)]);

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setEditModal(true);
  };

  const openNewModal = () => {
    setNewModal(true);
  };

  const handleDeleteStudent = async (student) => {
    const body = { $pull: { students: { name: `${student.name}` } } };
    try {
      const response = await updateOne(`${api_url}/users/${user._id}`, body);
      fetchUserData();
      return response;
    } catch (error) {
      console.log('An error ocurred deleting student', error);
    }
  };

  return !isLoading ? (
    <Box>
      <EditStudentModal
        editModal={editModal}
        setEditModal={setEditModal}
        user={user}
        student={selectedStudent}
        fetchUserData={fetchUserData}
      />
      <NewStudentModal
        newModal={newModal}
        setNewModal={setNewModal}
        user={user}
        fetchUserData={fetchUserData}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant='h3'>Mi Perfíl</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant='outlined'
            color='#FEFEFE'
            sx={{ borderRadius: '10px' }}
          >
            <Stack spacing={1} p={2}>
              <Typography variant='subtitle2' fontWeight={600}>
                Datos personales:
              </Typography>
              <Typography variant='body'>
                <Typography variant='body' fontWeight={600}>
                  Nombre:{' '}
                </Typography>
                {user?.fullname}
              </Typography>
              <Typography variant='body'>
                <Typography variant='body' fontWeight={600}>
                  Email:{' '}
                </Typography>
                {user?.email}
              </Typography>
              <Typography variant='body'>
                <Typography variant='body' fontWeight={600}>
                  Nº Socio:{' '}
                </Typography>
                {user?.memberNumber}
              </Typography>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='subtitle2' fontWeight={600}>
              Alumnos/as a cargo:
            </Typography>
            <Button variant='outlined' size='small' onClick={openNewModal}>
              Añadir alumno
            </Button>
          </Stack>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Ciclo</TableCell>
                <TableCell>Nivel</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData?.students?.map((student) => {
                return (
                  <TableRow key={uuidv4()}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.level}</TableCell>
                    <TableCell>
                      <Button onClick={() => openEditModal(student)}>
                        Editar
                      </Button>
                      <Button onClick={() => handleDeleteStudent(student)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Stack direction='row' justifyContent='center' spacing={2} pt={4}>
              <LogoutButton variant='contained'>Desconectar</LogoutButton>
              <Button variant='contained'>Borrar cuenta</Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <>
      <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
    </>
  );
};

export default Profile;
