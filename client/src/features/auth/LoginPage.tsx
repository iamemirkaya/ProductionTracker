import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApi";
import type { LoginRequest } from "../../app/models/authTypes";
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function LoginPage() {

    
    const navigate = useNavigate();
    const [login, { isLoading, error }] = useLoginMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();

    const onSubmit = async (data: LoginRequest) => {
        try {
            await login(data).unwrap();
            navigate('/production'); 
        } catch (err) {
            console.error('Giriş başarısız:', err);
        }
    };

    const apiError = error as { status?: number; data?: { title?: string; detail?: string } } | undefined;

  return (
    <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Card sx={{ minWidth: 400, boxShadow: 3, borderRadius: 2 }}>
                    <CardHeader
                        title={
                            <Typography component="h1" variant="h5" align="center">
                                Giriş Yap
                            </Typography>
                        }
                        subheader={
                             <Typography component="p" variant="body2" align="center" color="text.secondary">
                                Devam etmek için hesabınıza giriş yapın.
                            </Typography>
                        }
                    />
                    <CardContent>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Adresi"
                                autoComplete="email"
                                autoFocus
                                {...register('email', { required: 'Email alanı zorunludur' })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Şifre"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register('password', { required: 'Şifre alanı zorunludur' })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />

                            {apiError && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {apiError.data?.title || apiError.data?.detail || "Email veya şifre hatalı."}
                                </Alert>
                            )}

                            <Box sx={{ position: 'relative', mt: 3, mb: 2 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isLoading}
                                >
                                    Giriş Yap
                                </Button>
                                {isLoading && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Box>
                             <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                                >
                                Google ile Giriş Yap
                            </Button>
                            <Box display="flex" justifyContent="space-between">
                                <Link href="/forgot-password" variant="body2">
                                    Şifreni mi unuttun?
                                </Link>
                                <Link href="/register" variant="body2">
                                    {"Hesabın yok mu? Kayıt Ol"}
                                </Link>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
  )
}
