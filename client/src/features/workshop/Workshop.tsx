import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";
import { useDeleteWorkshopMutation, useGetAllWorkshopsQuery } from "./workshopApi";
import { DeleteIcon, EditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleDeleteWorkshop } from "./deleteWorkshopHandler";
import ConfirmDeleteDialog from "../../app/shared/components/ConfirmDeleteDialog";


export default function Workshop() {

    const { data: workshops, isLoading, isError } = useGetAllWorkshopsQuery();
    const [deleteWorkshop] = useDeleteWorkshopMutation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
    const navigate = useNavigate();


    const handleOpenDialog = (id: string) => {
    setSelectedWorkshopId(id);
    setDialogOpen(true);
    };

    const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedWorkshopId(null);
    };

    const handleConfirmDelete = async () => {
    if (!selectedWorkshopId) return;

    await handleDeleteWorkshop(
    selectedWorkshopId,
    deleteWorkshop,
    () => {
      handleCloseDialog();
      alert("Ürün başarıyla silindi.");
    },
    () => {
      handleCloseDialog();
      alert("Silme sırasında hata oluştu.");
    }
  );
};


  if (isLoading) return <LoadingSpinner open={true} />;
  if (isError) return <Typography color="error">Veriler yüklenirken hata oluştu.</Typography>;

  return (
     <div className="container mx-auto px-4">
      <Typography variant="h4" component="h1" className="mb-6 text-center font-bold text-gray-800">
        Atölye Listesi
      </Typography>

      <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold text-gray-700">Atölye Adı</TableCell>
              <TableCell className="font-semibold text-gray-700">Çalışan Sayısı</TableCell>
              <TableCell align="center" className="font-semibold text-gray-700">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshops && workshops.map((workshop) => (
              <TableRow key={workshop.id} className="hover:bg-gray-50 transition-colors duration-200">
                <TableCell className="font-medium">{workshop.name}</TableCell>
                <TableCell className="text-gray-600">{workshop.workerCount}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    <Tooltip title="Düzenle">
                      <IconButton
                        onClick={() => navigate(`/update-workshop/${workshop.id}`)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sil">
                      <IconButton
                        onClick={() => handleOpenDialog(workshop.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDeleteDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmDelete}
          />
    </div>
  )
}
