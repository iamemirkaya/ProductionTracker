import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import type { RegisterRequest } from "../../app/models/authTypes";


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



export default function RegisterPage() {
    const navigate = useNavigate();
    const [registerMutation, { isLoading, error }] = useRegisterMutation();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterRequest>();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const password = watch('password');

    const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
        const registrationData = { ...data, roleName: 'user' };
        setRegistrationSuccess(false); 

        try {
            await registerMutation(registrationData).unwrap();
            setRegistrationSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000); 
        } catch (err) {
            console.error('Kayıt başarısız:', err);
        }
    };

    const apiError = error as { status?: number; data?: { title?: string; detail?: string, errors?: any } } | undefined;

    const getErrorMessage = () => {
        if (!apiError) return null;
        if (apiError.data?.errors) {
            return Object.values(apiError.data.errors).flat().join(' ');
        }
        return apiError.data?.title || apiError.data?.detail || "Bilinmeyen bir hata oluştu.";
    }
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
                                Kayıt Ol
                            </Typography>
                        }
                        subheader={
                            <Typography component="p" variant="body2" align="center" color="text.secondary">
                                Yeni bir hesap oluşturun.
                            </Typography>
                        }
                    />
                    <CardContent>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullName"
                                label="Tam Adınız"
                                autoComplete="name"
                                autoFocus
                                {...register('fullName', { required: 'Tam ad alanı zorunludur' })}
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Adresi"
                                autoComplete="email"
                                {...register('email', { 
                                    required: 'Email alanı zorunludur',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Geçerli bir email adresi giriniz"
                                    }
                                })}
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
                                autoComplete="new-password"
                                {...register('password', { 
                                    required: 'Şifre alanı zorunludur',
                                    minLength: {
                                        value: 6,
                                        message: "Şifre en az 6 karakter olmalıdır"
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Şifreyi Onayla"
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                                {...register('confirmPassword', { 
                                    required: 'Şifre onay alanı zorunludur',
                                    validate: value => value === password || "Şifreler eşleşmiyor"
                                })}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />

                            {registrationSuccess && (
                                <Alert severity="success" sx={{ mt: 2 }}>
                                    Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...
                                </Alert>
                            )}

                            {apiError && !registrationSuccess && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {getErrorMessage()}
                                </Alert>
                            )}

                            <Box sx={{ position: 'relative', mt: 3, mb: 2 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isLoading}
                                >
                                    Kayıt Ol
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
                            <Box display="flex" justifyContent="flex-end">
                                <Link href="/login" variant="body2">
                                    {"Zaten bir hesabın var mı? Giriş Yap"}
                                </Link>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
  )
}
