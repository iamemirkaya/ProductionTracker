import { useState } from "react";
import { useCreateShiftMutation } from "./shiftApi";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";


export default function CreateShift() {

    const [createShift, { isLoading, error }] = useCreateShiftMutation();

    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        name: '',
        shiftMinute: '',
        startTime: '',
        endTime: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const requestData = {
        name: formState.name,
        shiftMinute: parseInt(formState.shiftMinute, 10),
        startTime: formState.startTime,
        endTime: formState.endTime
      };
      
      await createShift(requestData).unwrap();
      alert("Vardiya başarıyla oluşturuldu!");
      navigate('/shift'); // Vardiya listesine yönlendir
    } catch (err) {
      alert("Vardiya oluşturulurken hata oluştu.");
    }
  };

    if (isLoading) return <LoadingSpinner open={true} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" component="h1" className="mb-6 text-center font-bold text-gray-800">
        Yeni Vardiya Oluştur
      </Typography>

      <Paper className="max-w-md mx-auto p-6 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          <Box className="space-y-4">
            <TextField
              fullWidth
              label="Vardiya Adı"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              variant="outlined"
              className="mb-4"
            />

            <TextField
              fullWidth
              label="Süre (Dakika)"
              name="shiftMinute"
              type="number"
              value={formState.shiftMinute}
              onChange={handleChange}
              required
              variant="outlined"
              inputProps={{ min: 1 }}
              className="mb-4"
            />

            <Box className="mb-4">
              <Typography variant="body2" className="mb-2 text-gray-600">
                Başlangıç Saati
              </Typography>
              <TextField
                fullWidth
                name="startTime"
                type="time"
                value={formState.startTime}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box className="mb-6">
              <Typography variant="body2" className="mb-2 text-gray-600">
                Bitiş Saati
              </Typography>
              <TextField
                fullWidth
                name="endTime"
                type="time"
                value={formState.endTime}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            {error && (
              <Typography color="error" className="mb-4 text-center">
                Bir hata oluştu. Lütfen tekrar deneyin.
              </Typography>
            )}

            <Box className="flex gap-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="py-3"
                disabled={isLoading}
              >
                Vardiya Oluştur
              </Button>
              
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                fullWidth
                className="py-3"
                onClick={() => navigate('/shifts')}
              >
                İptal
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </div>
  )
}
