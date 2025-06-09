import { useState } from "react";
import { Button, TextField, Typography, Paper } from '@mui/material';
import { useCreateWorkshopMutation } from "./workshopApi";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";

export default function CreateWorkshop() {
  const [createWorkshop, { isLoading, error }] = useCreateWorkshopMutation();
  const [formState, setFormState] = useState({
    name: '',
    workerCount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // FormData yerine düz object gönder
    const requestData = {
      name: formState.name,
      workerCount: parseInt(formState.workerCount, 10)
    };
    
    createWorkshop(requestData);
  };

  if (isLoading) return <LoadingSpinner open={true} />;

  return (
    <Paper className="max-w-xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Atölye Ekle</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label="Atölye Adı"
          name="name"
          value={formState.name}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Çalışan Sayısı"
          name="workerCount"
          type="number"
          value={formState.workerCount}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          className="mt-8 py-4 text-lg font-semibold"
          fullWidth
        >
          Atölyeyi Kaydet
        </Button>

        {error && (
          <Typography color="error" className="text-center mt-4 font-medium">
            {(error as any)?.data?.Errors?.join(', ') || 'Bir hata oluştu.'}
          </Typography>
        )}
      </form>
    </Paper>
  );
}