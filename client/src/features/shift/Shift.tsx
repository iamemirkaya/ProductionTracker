import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeleteShiftMutation, useGetAllShiftsQuery } from "./shiftApi";
import { handleDeleteShift } from "./deleteShiftHandler";
import ConfirmDeleteDialog from "../../app/shared/components/ConfirmDeleteDialog";
import { DeleteIcon, EditIcon } from "lucide-react";


export default function Shift() {


    const { data: shifts, isLoading, isError } = useGetAllShiftsQuery();
    const [deleteShift] = useDeleteShiftMutation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();
    const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);


    const handleOpenDialog = (id: string) => {
    setSelectedShiftId(id);
    setDialogOpen(true);
    };

    const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedShiftId(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedShiftId) return;
    
        await handleDeleteShift(
        selectedShiftId,
        deleteShift,
        () => {
          handleCloseDialog();
          alert("Vardiya başarıyla silindi.");
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
        Vardiya Listesi
      </Typography>

      <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold text-gray-700">Vardiya Adı</TableCell>
              <TableCell className="font-semibold text-gray-700">Başlangıç Saati</TableCell>
              <TableCell className="font-semibold text-gray-700">Bitiş Saati</TableCell>
              <TableCell className="font-semibold text-gray-700">Süre (Dakika)</TableCell>
              <TableCell align="center" className="font-semibold text-gray-700">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts && shifts.map((shift) => (
              <TableRow key={shift.id} className="hover:bg-gray-50 transition-colors duration-200">
                <TableCell className="font-medium">{shift.name}</TableCell>
                <TableCell className="text-gray-600">{shift.startTime}</TableCell>
                <TableCell className="text-gray-600">{shift.endTime}</TableCell>
                <TableCell className="text-gray-600">{shift.shiftMinute}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    <Tooltip title="Düzenle">
                      <IconButton
                        onClick={() => navigate(`/update-shift/${shift.id}`)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sil">
                      <IconButton
                        onClick={() => handleOpenDialog(shift.id)}
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
