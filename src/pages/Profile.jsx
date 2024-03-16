import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LogoutButton from '../components/Logout';
import EditStudentModal from '../components/modals/EditStudentModal';
import NewStudentModal from '../components/modals/NewStudentModal';
import useAuth from '../hooks/useAuth';
import { createStudent, deleteStudent, getStudentsByUserId, updateStudent } from '../functions/students';
import DeleteStudentModal from '../components/modals/DeleteStudentModal';
import DeleteAccountModal from '../components/modals/DeleteAccountModal';
import { deleteUser } from '../functions/users';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoading, userAuthentication } = useAuth();
  const [editModal, setEditModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [newStudent, setNewStudent] = useState();
  const [selectedStudent, setSelectedStudent] = useState();
  const [students, setStudents] = useState([]);
  ///////////////////////////////////////////////////////////////////////
  ////////////////////////// FETCHING ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  useEffect(() => {
    userAuthentication();
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await getStudentsByUserId(user._id);
    setStudents(response);
  };
  ///////////////////////////////////////////////////////////////////////
  ////////////////////////// MODAL HANDLERS /////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  const openNewModal = () => {
    setNewModal(true);
  };
  const closeNewModal = () => {
    setNewModal(false);
  };
  const openEditModal = (student) => {
    setSelectedStudent(student);
    setEditModal(true);
  };
  const closeEditModal = () => {
    setSelectedStudent(undefined);
    setEditModal(false);
  };
  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setSelectedStudent(undefined);
    setDeleteModal(false);
  };
  const openDeleteAccountModal = () => {
    setDeleteAccountModal(true);
  };
  const closeDeleteAccountModal = () => {
    setDeleteAccountModal(false);
  };
  ///////////////////////////////////////////////////////////////////////
  ////////////////////////// ACTIONS ////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  const handleCreateStudent = async () => {
    const body = {
      name: newStudent.name,
      level: newStudent.level,
      user: user._id,
    };
    await createStudent(body);
    setNewStudent(undefined);
    closeNewModal();
    fetchStudents();
  };
  const handleEditStudent = async () => {
    console.log(selectedStudent);
    const body = {
      name: selectedStudent.name,
      level: selectedStudent.level,
      id: selectedStudent._id,
    };
    await updateStudent(body);
    setSelectedStudent(undefined);
    closeEditModal();
    fetchStudents();
  };
  const handleDeleteStudent = async () => {
    await deleteStudent(selectedStudent._id);
    setDeleteModal(false);
    fetchStudents();
  };
  const handleDeleteAccount = async () => {
    students.forEach((student) => {
      deleteStudent(student._id);
    });
    deleteUser(user._id);
    setDeleteAccountModal(false);
    navigate('/');
  };
  ///////////////////////////////////////////////////////////////////////
  ////////////////////////// RENDER /////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  return !isLoading ? (
    <Box maxWidth='97%'>
      <NewStudentModal openModal={newModal} closeModal={closeNewModal} newStudent={newStudent} setNewStudent={setNewStudent} handleCreateStudent={handleCreateStudent} />
      <EditStudentModal openModal={editModal} closeModal={closeEditModal} selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} handleEditStudent={handleEditStudent} />
      <DeleteStudentModal openModal={deleteModal} closeModal={closeDeleteModal} selectedStudent={selectedStudent} handleDeleteStudent={handleDeleteStudent} />
      <DeleteAccountModal openModal={deleteAccountModal} closeModal={closeDeleteAccountModal} handleDeleteAccount={handleDeleteAccount} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant='h3'>Mi cuenta</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper variant='outlined' color='#FEFEFE' sx={{ borderRadius: '10px' }}>
            <Stack spacing={1} p={2}>
              <Typography variant='h6'>Datos personales:</Typography>
              <Stack direction='row' alignItems='center' spacing={1}>
                <Typography variant='body2' fontWeight={600}>
                  Nombre:{' '}
                </Typography>
                <Typography variant='body1'>{user?.name} {user?.surname}</Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={1}>
                <Typography variant='body2' fontWeight={600}>
                  Email:{' '}
                </Typography>
                <Typography variant='body1'>{user?.email}</Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={1}>
                <Typography variant='body2' fontWeight={600}>
                  Nº Socio:{' '}
                </Typography>
                <Typography variant='body1'>{user?.memberNumber}</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper variant='outlined' color='#FEFEFE' sx={{ borderRadius: '10px' }}>
            <Stack p={2}>
              <Stack direction='row' alignItems='center' justifyContent='space-between' pb={2}>
                <Typography variant='subtitle2' fontWeight={600}>
                  Alumnos/as a cargo:
                </Typography>
                <Button variant='outlined' size='small' onClick={openNewModal}>
                  Añadir alumno
                </Button>
              </Stack>
              {students.length === 0 && <Typography variant='subtitle2'>No se han encontrado alumnos asociados. Use el botón de añadir alumno para comenzar.</Typography>}
              {students?.map((student) => {
                return (
                  <Stack direction='row' justifyContent='space-between' sx={{ borderTop: '1px solid #dddddd' }} p={1} key={uuidv4()}>
                    <Stack>
                      <Typography>{student.name}</Typography>
                      <Typography>{student.level}</Typography>
                    </Stack>
                    <Stack direction='row'>
                      <Button onClick={() => openEditModal(student)}>
                        <ModeEditIcon />
                      </Button>
                      <Button onClick={() => openDeleteModal(student)}>
                        <DeleteForeverIcon />
                      </Button>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Paper>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Stack direction='row' justifyContent='center' spacing={2} pt={4}>
              <LogoutButton variant='contained'>Desconectar</LogoutButton>
              <Button variant='contained' onClick={openDeleteAccountModal}>
                Borrar cuenta
              </Button>
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
