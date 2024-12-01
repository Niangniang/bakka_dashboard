import { LoadingButton } from '@mui/lab';
import { Stack, Alert, Snackbar, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { addParameter, getParameters } from 'src/services/parameterService.tsx';
import './parameter-view.css';

export default function ParameterView() {
  const [parameters, setParameters] = useState([]);
  const getParametersData = async () => {
    const datas = await getParameters();
    setParameters(datas);
  };
  useEffect(() => {
    getParametersData();
    console.log('parameters', parameters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [valeur, setValeur] = useState();
  const [libelle, setLibelle] = useState();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const parameter = {
      libelle,
      valeur,
    };
    try {
      const data = await addParameter(parameter);
      console.log('parametre enregistré', data);
      // Redirection ou gestion post-connexion
      setSnackbar({
        open: true,
        message: 'Paramètre enregistré',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "l'enregistrement à échoué",
        severity: 'error',
      });
      console.error('Erreur lors de la connexion:', error.message);
      // Gestion des erreurs d'authentification
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container>
      <Typography variant="h4">Parameter</Typography>
      <section style={{ display: 'flex', justifyContent: 'space-between ' }}>
        <div>
          <Stack spacing={3}>
            <TextField
              style={{ width: '450px' }}
              name="libelle"
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
              label="Libellé"
            />
            <TextField
              style={{ width: '450px' }}
              name="valeur"
              value={valeur}
              onChange={(e) => setValeur(e.target.value)}
              label="Valeur"
            />
          </Stack>
          <LoadingButton
            style={{ marginTop: '40px', width: '200px' }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            loading={loading}
            onClick={handleSubmit}
          >
            Enregistrer
          </LoadingButton>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
        <table>
          <tr>
            <th>Intitule</th>
            <th>Valeur</th>
          </tr>
          {parameters.map((p) => (
            <tr key={p.id}>
              <td>{p.libelle}</td>
              <td>{p.valeur}</td>
            </tr>
          ))}
        </table>
      </section>
    </Container>
  );
}
