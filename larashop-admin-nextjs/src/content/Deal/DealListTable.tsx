import { FC, ChangeEvent, useEffect, useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  Button,
  Card,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  TextField,
  Typography,
  useTheme,
  Grid,
  CardContent
} from '@mui/material';

import { DealStatusLabel } from '@/components/DealStatusLabel';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Deal, DealStatus } from '@/types/responseType';
import getDeals from "@/services/deal/getDeals"

interface DealListTableProps {
  className?: string;
}

interface Filters {
  keyword?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  status?: DealStatus | null;
}

const DealListTable: FC<DealListTableProps> = ({}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<Filters>({
    keyword: null,
    minPrice: null,
    maxPrice: null,
    status: null
  });

  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const initialFetch = async () => {
      const params = {
        limit: limit,
        page: 1,
      }
      const dealPaginate = await getDeals(params);
      setDeals(dealPaginate.data.deals);
      setLimit(dealPaginate.meta.perPage);
      setTotal(dealPaginate.meta.total);
    }
    initialFetch()
  }, []);

  useEffect(() => {
    fetchDeals()
  }, [page, limit]);

  const fetchDeals = async () => {
    const params = {
      limit: limit,
      page: page + 1,
      keyword: filters.keyword,
      min_price: filters.minPrice,
      max_price: filters.maxPrice,
      status: filters.status,
    }
    const dealPaginate = await getDeals(params);
    setDeals(dealPaginate.data.deals);
    setTotal(dealPaginate.meta.total);
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>, key: string): void => {
    const value = e.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleSearchClick = async () => {
    fetchDeals()
  }

  const theme = useTheme();

  const statusOptions = [
    {
      id: 'listing',
      name: '出品中'
    },
    {
      id: 'purchased',
      name: '購入済'
    },
    {
      id: 'shipping',
      name: '配送中'
    },
    {
      id: 'completed',
      name: '取引完了'
    },
    {
      id: 'cancaled',
      name: 'キャンセル'
    }
  ];

  return (
    <Card>
      <CardContent>
        <Grid item xs={12}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="キーワード"
              type="search"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange(e, 'keyword')}
            />
            <TextField
              label="金額最小"
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange(e, 'minPrice')}
            />
            <TextField
              label="金額最大"
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange(e, 'maxPrice')}
            />
            <TextField
              select
              label="ステータス"
              SelectProps={{
                native: true
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange(e, 'status')}
            >
                <option></option>
              {statusOptions.map((statusOption) => (
                <option key={statusOption.id} value={statusOption.id}>
                  {statusOption.name}
                </option>
              ))}
            </TextField>
            <Button size="large" sx={{ margin: 1 }} variant="contained" onClick={handleSearchClick}>
              検索
            </Button>
          </Box>
        </Grid>
      </CardContent>

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>商品名</TableCell>
              <TableCell>出品者</TableCell>
              <TableCell>購入者</TableCell>
              <TableCell align="right">金額</TableCell>
              <TableCell align="right">ステータス</TableCell>
              <TableCell align="right">アクション</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deals.map((deal) => {
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
                    <Typography variant="body2" color="text.secondary" noWrap>
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
                      <Link href={`/users/${deal.seller.id}`}>
                        <div>{deal.seller.name}</div>
                      </Link>
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
                      {deal.buyer ? (
                        <Link href={`/users/${deal.buyer.id}`}>
                          <div>{deal.buyer.name}</div>
                        </Link>
                      ) : (
                        <div>購入者なし</div>
                      )}
                    </Typography>
                    
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      ¥{deal.product.price.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <DealStatusLabel dealStatus={deal.status} />
                  </TableCell>
                  <TableCell align="right">
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
      <Box p={2}>
        <TablePagination
          component="div"
          count={total}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
          SelectProps={{
            native: true
          }}
        />
      </Box>
    </Card>
  );
};

export default DealListTable;
