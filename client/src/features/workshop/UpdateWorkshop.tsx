
import { useParams, useNavigate } from "react-router-dom";
import { useGetWorkshopByIdQuery, useUpdateWorkshopMutation } from "./workshopApi";
import { useState, useEffect } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";

export default function UpdateWorkshop() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: workshop, isLoading: isFetching, error: fetchError } = useGetWorkshopByIdQuery(id!);
  const [updateWorkshop, { isLoading: isUpdating, error: updateError }] = useUpdateWorkshopMutation();

  const [formState, setFormState] = useState({
    name: '',
    workerCount: '',
  });

  useEffect(() => {
    if (workshop) {
      setFormState({
        name: workshop.name,
        workerCount: workshop.workerCount.toString(),
      });
    }
  }, [workshop]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedWorkshop = {
      id: id!,
      name: formState.name,
      workerCount: parseInt(formState.workerCount, 10),
    };

    try {
      await updateWorkshop(updatedWorkshop).unwrap();
      navigate("/workshop"); // veya başarı mesajı gösterilebilir
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  if (isFetching || isUpdating) return <LoadingSpinner open={true} />;

  return (
    <Paper className="max-w-xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Atölye Güncelle</h2>
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
          Atölyeyi Güncelle
        </Button>

        {(fetchError || updateError) && (
          <Typography color="error" className="text-center mt-4 font-medium">
            {(fetchError as any)?.data?.Errors?.join(', ') || (updateError as any)?.data?.Errors?.join(', ') || 'Bir hata oluştu.'}
          </Typography>
        )}
      </form>
    </Paper>
  );
}
