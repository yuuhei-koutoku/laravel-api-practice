import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, Typography } from '@mui/material';

import UserList from '@/content/User/UserList';

function UserListPage() {

  return (
    <>
      <Head>
        <title>ユーザー一覧</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              ユーザー一覧
            </Typography>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <UserList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

UserListPage.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default UserListPage;
