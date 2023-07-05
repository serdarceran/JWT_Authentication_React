import { Box, Container, Typography, Grid } from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import FullScreenLoader from '../components/FullScreenLoader';
import { useGetAllUsersQuery } from '../redux/api/userApi';
import Message from '../components/Message';
import UserItem from '../components/user.component';

const AdminPage = () => {
  const { isLoading, isError, error, data: users } = useGetAllUsersQuery()

  useEffect(() => {
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          backgroundColor: '#ece9e9',
          mt: '2rem',
          height: '15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          sx={{ color: '#1f1e1e', fontWeight: 500 }}
        >
          Admin Page
        </Typography>
        
      </Box>
      {users?.length === 0 ? (
        <Box maxWidth='sm' sx={{ mx: 'auto', py: '5rem' }}>
          <Message type='info' title='Info'>
            No posts at the moment
          </Message>
        </Box>
      ) : (
        <Grid
          container
          rowGap={5}
          maxWidth='lg'
          sx={{
            margin: '0 auto',
            py: '0rem',
            gridAutoRows: 'max-content',
          }}
        >
          {users?.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminPage;
