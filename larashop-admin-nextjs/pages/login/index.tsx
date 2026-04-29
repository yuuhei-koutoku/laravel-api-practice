'use client';

import Head from 'next/head';
import { useState } from 'react';

import { useRouter } from 'next/router'
import { useAuthContext } from '@/contexts/AuthContext'
import { useForm } from 'react-hook-form'

import FormValidationError, { hasError, getErrors }  from "@/types/FormValidationError";
import toast from "react-hot-toast";

import {
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export type LoginFormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const { isLoaded, authUser, attempt, signin } = useAuthContext()

  const {
    register,
    handleSubmit
  } = useForm<LoginFormData>()

  const [validationError, setValidationError] = useState<FormValidationError|null>(null);

  if (!isLoaded) {
    return <></>
  }

  if (authUser) {
    router.push('/deals');
    return <></>
  }

  const onSubmit = async (data: LoginFormData) => {

    const { email, password } = data

    try {
      const accessToken = await attempt(email, password);
      if (accessToken === null) {
        throw new Error('アクセストークンの取得に失敗しました。');
      }

      setValidationError(null);
      signin(accessToken);
      const redirectPath = '/deals';
      router.push(redirectPath);
      toast.success('ログインしました');
    } catch (error: unknown) {
      if (error instanceof FormValidationError) {
        setValidationError(error);
        toast.error('入力内容に誤りがあります。');
      } else {
        toast.error('ログインに失敗しました');
      }
    }
  }

  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <Container maxWidth="lg">

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          sx={{mt: 6}}
        >

          <Grid item xs={12}>
            <Card>
              <CardContent>

                <Typography variant="h1" component="h1" align="center" color="primary" gutterBottom sx={{ mt: 2, mb: 3 }}>
                  Larashop Admin ログイン
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="email"
                      label="Email"
                      variant="standard"
                      inputProps={{ style: { padding: '8px' } }}
                      {...register('email', {})}
                    />
                    { validationError && hasError(validationError, 'email') &&
                      getErrors(validationError, 'email').map((detail: string, key: number) => <p key={key} className="mt-1.5 text-red-500">{detail}</p>) }
                    </div>
                  <div>
                    <Box p={1}>
                    <TextField
                      required
                      id="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="standard"
                      inputProps={{ style: { padding: '8px' } }}
                      {...register('password', {})}
                    />
                    { validationError && hasError(validationError, 'password') &&
                      getErrors(validationError, 'password').map((detail: string, key: number) => <p key={key} className="mt-1.5 text-red-500">{detail}</p>) }
                    </Box>
                  </div>
                  <Button type="submit" sx={{ margin: 1 }} variant="contained" color="primary">
                    ログイン
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}

export default LoginPage;
