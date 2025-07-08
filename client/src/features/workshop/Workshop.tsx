import { IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";
import { useDeleteWorkshopMutation, useGetPagedWorkshopsQuery,  } from "./workshopApi";
import { DeleteIcon, EditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleDeleteWorkshop } from "./deleteWorkshopHandler";
import ConfirmDeleteDialog from "../../app/shared/components/ConfirmDeleteDialog";
import WorkshopSearch from "./WorkshopSearch";
import { useAppSelector } from "../../app/store/store";


export default function Workshop() {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const { searchTerm } = useAppSelector(state => state.workshop);
    const { data: pagedData, isLoading, isFetching, isError } = useGetPagedWorkshopsQuery({ page, pageSize, searchTerm });
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

  const totalPages = pagedData ? Math.ceil(pagedData.totalCount / pageSize) : 0;
  return (
     <div className="container mx-auto px-4 py-8">
            <LoadingSpinner open={isFetching} />

            <Typography variant="h4" component="h1" className="mb-6 text-center font-bold text-gray-800">
                Atölye Listesi
            </Typography>
            <WorkshopSearch />

            <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden mb-6">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-50">
                            <TableCell className="font-semibold text-gray-700">Atölye Adı</TableCell>
                            <TableCell className="font-semibold text-gray-700">Çalışan Sayısı</TableCell>
                            <TableCell align="center" className="font-semibold text-gray-700">İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pagedData && pagedData.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center" className="text-gray-500 py-4">
                                    Gösterilecek atölye bulunamadı.
                                </TableCell>
                            </TableRow>
                        ) : (
                            pagedData?.data.map((workshop) => (
                                <TableRow key={workshop.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <TableCell className="font-medium">{workshop.name}</TableCell>
                                    <TableCell className="text-gray-600">{workshop.workerCount}</TableCell>
                                    <TableCell align="center">
                                        <div className="flex justify-center gap-2">
                                            <Tooltip title="Düzenle">
                                                <IconButton onClick={() => navigate(`/update-workshop/${workshop.id}`)} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Sil">
                                                <IconButton onClick={() => handleOpenDialog(workshop.id)} color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="flex justify-center mt-6">
                <Pagination
                    count={totalPages} // Hesaplanan toplam sayfa sayısını kullan
                    page={page}
                    onChange={(event, newPage) => setPage(newPage)}
                    color="primary"
                    showFirstButton
                    showLastButton
                />
            </div>

            <ConfirmDeleteDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
            />
        </div>
  )
}
