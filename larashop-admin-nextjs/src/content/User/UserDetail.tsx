import { FC, useEffect, useState } from 'react';
import {
  Avatar,
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Tooltip,
  useTheme,
} from '@mui/material';
import { DealStatusLabel } from '@/components/DealStatusLabel';
import Text from '@/components/Text';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Deal, User } from '@/types/responseType';

import getUser from "@/services/user/getUser"
import getPurchasedDeals from "@/services/user/getPurchasedDeals"
import getListedDeals from "@/services/user/getListedDeals"

interface UserDetailProps {
  id: number
}

const UserDetail: FC<UserDetailProps> = ( { id } ) => {

  const [user, setUser] = useState<User | null>(null);
  const [purchasedDeals, setPurchasedDeals] = useState<Deal[]>([]);
  const [listedDeals, setListedDeals] = useState<Deal[]>([]);

  const theme = useTheme();

  useEffect(() => {
    const getUserInternal = async () => {
      const user = await getUser({ id: id });
      setUser(user);
    }

    getUserInternal()
  }, []);

  useEffect(() => {

    if (!user) {
      return
    }

    const getPurchasedDealsInternal = async () => {
      const deals = await getPurchasedDeals({id: user.id});
      setPurchasedDeals(deals);
    }
    const getListedDealsInternal = async () => {
      const deals = await getListedDeals({id: user.id});
      setListedDeals(deals);
    }

    getPurchasedDealsInternal()
    getListedDealsInternal()

  }, [user]);

  if (!user || !purchasedDeals || !listedDeals) {
    return <></>
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                ユーザー情報
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>

                <Grid item xs={12} justifyContent="center" display="flex">
                  <Box pr={3} pb={2}>
                    <Avatar src={user.profileImageUrl} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>Email:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{user.email}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>氏名:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{user.name}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>郵便番号:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{user.postalCode}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>住所:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{user.address}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>電話番号:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{user.tel}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>ニックネーム:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{user.nickname}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>氏名:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{user.name}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>紹介文:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{user.description}</b></Text>
                </Grid>

              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                購入した取引一覧
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>商品名</TableCell>
                        <TableCell>金額</TableCell>
                        <TableCell>ステータス</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {purchasedDeals.map((deal) => {
                        return (
                          <TableRow
                            hover
                            key={deal.id}
                          >
                            <TableCell>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {deal.product.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                <div>¥{deal.product.price.toLocaleString()}</div>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                <DealStatusLabel dealStatus={deal.status} />
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Tooltip title="詳細画面へ" arrow>
                                <Link href={`/deals/${deal.id}`}>
                                  <IconButton
                                    sx={{
                                      '&:hover': {
                                        background: theme.colors.primary.lighter
                                      },
                                      color: theme.palette.primary.main
                                    }}
                                    color="inherit"
                                    size="small"
                                  >
                                    <OpenInNewIcon fontSize="medium" />
                                  </IconButton>
                                </Link>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                出品した取引一覧
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>商品名</TableCell>
                        <TableCell>金額</TableCell>
                        <TableCell>ステータス</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listedDeals.map((deal) => {
                        return (
                          <TableRow
                            hover
                            key={deal.id}
                          >
                            <TableCell>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {deal.product.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                <div>¥{deal.product.price.toLocaleString()}</div>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                <DealStatusLabel dealStatus={deal.status} />
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Tooltip title="詳細画面へ" arrow>
                                <Link href={`/deals/${deal.id}`}>
                                  <IconButton
                                    sx={{
                                      '&:hover': {
                                        background: theme.colors.primary.lighter
                                      },
                                      color: theme.palette.primary.main
                                    }}
                                    color="inherit"
                                    size="small"
                                  >
                                    <OpenInNewIcon fontSize="medium" />
                                  </IconButton>
                                </Link>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
}

export default UserDetail;