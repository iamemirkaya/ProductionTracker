import { useParams, useNavigate } from "react-router-dom";
import { useGetShiftByIdQuery, useUpdateShiftMutation } from "./shiftApi";
import { useState, useEffect } from "react";
import { Button, TextField, Typography, Paper, Box } from "@mui/material";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";

export default function UpdateShift() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: shift, isLoading: isFetching, error: fetchError } = useGetShiftByIdQuery(id!);
  const [updateShift, { isLoading: isUpdating, error: updateError }] = useUpdateShiftMutation();

  const [formState, setFormState] = useState({
    name: '',
    shiftMinute: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    if (shift) {
      setFormState({
        name: shift.name,
        shiftMinute: shift.shiftMinute.toString(),
        startTime: shift.startTime,
        endTime: shift.endTime,
      });
    }
  }, [shift]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedShift = {
      id: id!,
      name: formState.name,
      shiftMinute: parseInt(formState.shiftMinute, 10),
      startTime: formState.startTime,
      endTime: formState.endTime,
    };

    try {
      await updateShift(updatedShift).unwrap();
      alert("Vardiya başarıyla güncellendi!");
      navigate("/shift");
    } catch (err) {
      console.error("Güncelleme hatası:", err);
      alert("Güncelleme sırasında hata oluştu.");
    }
  };

  if (isFetching || isUpdating) return <LoadingSpinner open={true} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Paper className="max-w-xl mx-auto p-8 shadow-lg rounded-lg">
        <div className="mb-8 text-center">
          <Typography variant="h4" component="h2" className="text-2xl font-semibold text-gray-800">
            Vardiya Güncelle
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Vardiya Adı"
            name="name"
            value={formState.name}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />

          <TextField
            label="Süre (Dakika)"
            name="shiftMinute"
            type="number"
            value={formState.shiftMinute}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            inputProps={{ min: 1 }}
          />

          <Box>
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

          <Box>
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

          <Box className="flex gap-4 mt-8">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="py-4 text-lg font-semibold"
              disabled={isUpdating}
            >
              Vardiyayı Güncelle
            </Button>
            
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              fullWidth
              className="py-4 text-lg font-semibold"
              onClick={() => navigate('/shifts')}
            >
              İptal
            </Button>
          </Box>

          {(fetchError || updateError) && (
            <Typography color="error" className="text-center mt-4 font-medium">
              {(fetchError as any)?.data?.Errors?.join(', ') || 
               (updateError as any)?.data?.Errors?.join(', ') || 
               'Bir hata oluştu.'}
            </Typography>
          )}
        </form>
      </Paper>
    </div>
  );
}