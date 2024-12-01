import { useState } from 'react';
import Box from '@mui/material/Box';
// import { Router } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import signupService from 'src/services/signupService.tsx';
import Iconify from 'src/components/iconify';
import { Alert, Snackbar, IconButton, InputAdornment } from '@mui/material';

export default function SignUp() {
  const theme = useTheme();
  const [nom, setNom] = useState('');
  const [userName, setUserName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telephoneError, setTelephoneError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const validateTelephone = (tel) => {
    const re = /^(77|78)\d{7}$/;
    return re.test(tel);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!validateTelephone(telephone)) {
        setTelephoneError('Le numéro de téléphone est incorrecte.');
      } else if (!validateEmail(userName)) {
        setEmailError('Adresse email invalide.');
      } else if (password !== newpassword) {
        setPasswordError('Les mots de passe ne correspondent pas.');
      } else {
        setPasswordError('');
        setEmailError('');
        setTelephoneError('');
        const data = await signupService.signup(nom, prenom, userName, password, telephone);
        console.log('Connexion réussie:', data);

        setSnackbar({
          open: true,
          message: 'Admin ajouté avec succès',
          severity: 'success',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.message);
      setSnackbar({
        open: true,
        message: 'Échec du traitement',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          label="Votre Nom"
        />
        <TextField
          name="prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          label="Votre prénom"
        />
        <TextField
          error={Boolean(emailError)}
          helperText={emailError}
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          label="Votre Email"
        />
        <TextField
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          helperText={<span style={{ color: 'red' }}>{passwordError}</span>}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="newpassword"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          label="Confirmation Mot de passe"
          type={showNewPassword ? 'text' : 'password'}
          helperText={<span style={{ color: 'red' }}>{passwordError}</span>}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                  <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          error={Boolean(telephoneError)}
          helperText={telephoneError}
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          label="Téléphone"
        />
      </Stack>

      <LoadingButton
        style={{ marginTop: '25px' }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={loading}
        onClick={handleSignUp}
      >
        Ajouter
      </LoadingButton>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography style={{ marginBottom: '15px', textAlign: 'center' }} variant="h4">
            Ajout admin
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
