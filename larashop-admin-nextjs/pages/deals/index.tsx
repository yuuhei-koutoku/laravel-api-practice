import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, Typography } from '@mui/material';

import DealList from '@/content/Deal/DealList';

function DealListPage() {
  return (
    <>
      <Head>
        <title>取引一覧</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              取引一覧
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
            <DealList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

DealListPage.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default DealListPage;
