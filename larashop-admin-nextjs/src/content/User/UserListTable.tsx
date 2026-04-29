import { FC, ChangeEvent, useEffect, useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
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
} from '@mui/material';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { User } from '@/types/responseType';
import getUsers from "@/services/user/getUsers"

interface UserListTableProps {
  className?: string;
}

interface Filters {
  keyword?: string | null;
}

const UserListTable: FC<UserListTableProps> = ({}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<Filters>({
    keyword: null,
  });
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const initialFetch = async () => {
      const params = {
        limit: limit,
        page: 1,
      }
      const userPaginate = await getUsers(params);
      setUsers(userPaginate.data.users);
      setLimit(userPaginate.meta.perPage);
      setTotal(userPaginate.meta.total);
    }
    initialFetch()
  }, []);

  useEffect(() => {
    fetchUsers()
  }, [page, limit]);

  const fetchUsers = async () => {
    const params = {
      limit: limit,
      page: page + 1,
      keyword: filters.keyword,
    }
    const userPaginate = await getUsers(params);
    setUsers(userPaginate.data.users);
    setTotal(userPaginate.meta.total);
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
    fetchUsers()
  }

  const theme = useTheme();

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
              <TableCell>Email</TableCell>
              <TableCell>氏名</TableCell>
              <TableCell align="right">アクション</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow
                  hover
                  key={user.id}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.email}
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
                      <div>{user.name}</div>
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="詳細画面へ" arrow>
                      <Link href={`/users/${user.id}`}>
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

export default UserListTable;
