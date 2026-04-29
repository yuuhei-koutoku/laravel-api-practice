import { FC, useEffect, useState } from 'react';
import {
  Avatar,
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@mui/material';
import Text from '@/components/Text';
import { actorLabel, DealDetail, dealEventTypeLabel } from '@/types/responseType';
import { DealStatusLabel } from '@/components/DealStatusLabel';
import { formatDatetime } from '@/utils/formatDatetime'

import getDeal from "@/services/deal/getDeal"

interface DealDetailProps {
  id: number
}

const DealDetail: FC<DealDetailProps> = ( { id } ) => {

  const [deal, setDeal] = useState<DealDetail | null>(null);
  useEffect(() => {
    const getDealInternal = async () => {
      const deal = await getDeal({ id: id });
      setDeal(deal);
    }
    getDealInternal()
  }, []);

  if (!deal) {
    return <></>
  }

  return (
    <Grid container spacing={3}>
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
                出品者情報
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>

                <Grid item xs={12} justifyContent="center" display="flex">
                  <Box pr={3} pb={2}>
                    <Avatar src={deal.seller.profileImageUrl} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>Email:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.seller.email}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>氏名:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.seller.name}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>郵便番号:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.seller.postalCode}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>住所:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.seller.address}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>電話番号:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.seller.tel}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>ニックネーム:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.seller.nickname}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>氏名:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.seller.name}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>紹介文:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.seller.description}</b></Text>
                </Grid>

                <Grid item xs={12} justifyContent="center" display="flex">
                  <Link href={`/users/${deal.seller.id}`}>
                    <Button size="small" sx={{ mx: 1 }} variant="outlined">
                      ユーザー詳細画面
                    </Button>
                  </Link>
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
                購入者情報
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
          {deal.buyer ? (
            <Typography variant="subtitle2">
              <Grid container spacing={0}>

                <Grid item xs={12} justifyContent="center" display="flex">
                  <Box pr={3} pb={2}>
                    <Avatar src={deal.buyer.profileImageUrl} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>Email:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.buyer.email}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>氏名:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.buyer.name}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>郵便番号:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.buyer.postalCode}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>住所:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.buyer.address}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>電話番号:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.buyer.tel}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>ニックネーム:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.buyer.nickname}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>氏名:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.buyer.name}</b></Text>
                </Grid>

                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>紹介文:</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black"><b>{deal.buyer.description}</b></Text>
                </Grid>

                <Grid item xs={12} justifyContent="center" display="flex">
                  <Link href={`/users/${deal.buyer.id}`}>
                    <Button size="small" sx={{ mx: 1 }} variant="outlined">
                      ユーザー詳細画面
                    </Button>
                  </Link>
                </Grid>

              </Grid>
            </Typography>
          ) : (<div>購入されていません</div>)}
          </CardContent>
        </Card>
      </Grid>

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
                取引履歴
              </Typography>
            </Box>
            <Box pr={3} pb={2}>
              現在のステータス:
              <DealStatusLabel dealStatus={deal.status} />
            </Box>
          </Box>

          <Divider />

          <CardContent sx={{ p: 4 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>時刻</TableCell>
                    <TableCell>ユーザー</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deal.dealEvents.map((dealEvent) => {
                    return (
                      <TableRow
                        hover
                        key={dealEvent.id}
                      >
                        <TableCell>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {formatDatetime(dealEvent.createdAt)}
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
                            <div>{actorLabel(dealEvent.actorType)}</div>
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
                            <div>{dealEventTypeLabel(dealEvent.eventType)}</div>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

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
                商品情報
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    商品名:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{deal.product.name}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    金額:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>¥{deal.product.price.toLocaleString()}</b>
                  </Text>
                </Grid>

                <Grid container spacing={2}>
                  {deal.product.imageUrls.map((imageUrl, index) => (
                      <Grid item xs={6} md={4} key={index}>
                          <img src={imageUrl} alt={`product-${index}`} style={{width: '100%'}} />
                      </Grid>
                  ))}
                </Grid>

              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
    </Grid>
  );
}

export default DealDetail;