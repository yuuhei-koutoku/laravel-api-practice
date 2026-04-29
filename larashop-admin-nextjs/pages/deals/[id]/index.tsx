import Head from 'next/head';
import { useRouter } from 'next/router'
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, Typography } from '@mui/material';

import DealDetail from '@/content/Deal/DealDetail';

function DealDetailpage() {

  const router = useRouter()
  const { id } = router.query
  const idNumber = id ? parseInt(id as string, 10) : undefined

  if (!id) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>取引詳細</title>
      </Head>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              取引詳細
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
            <DealDetail id={idNumber} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

DealDetailpage.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default DealDetailpage;
