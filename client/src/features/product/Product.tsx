import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,} from '@mui/material';
import { useDeleteProductMutation, useGetAllProductsQuery } from './productApi';
import LoadingSpinner from '../../app/shared/components/LoadingSpinner';
import { useState } from 'react';
import { handleDeleteProduct } from './deleteProductHandler';
import ConfirmDeleteDialog from '../../app/shared/components/ConfirmDeleteDialog';
import { useNavigate } from 'react-router-dom';

export default function Product() {
  const { data: products, isLoading, isError } = useGetAllProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOpenDialog = (id: string) => {
  setSelectedProductId(id);
  setDialogOpen(true);
};

const handleCloseDialog = () => {
  setDialogOpen(false);
  setSelectedProductId(null);
};

const handleConfirmDelete = async () => {
  if (!selectedProductId) return;

  await handleDeleteProduct(
    selectedProductId,
    deleteProduct,
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
      <Typography
        variant="h4"
        component="h1"
        className="mb-6 text-center font-bold text-gray-800"
      >
        Ürün Listesi
      </Typography>

      <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold text-gray-700">Ürün Adı</TableCell>
              <TableCell className="font-semibold text-gray-700">Kodu</TableCell>
              <TableCell className="font-semibold text-gray-700">Birim Fiyatı (₺)</TableCell>
              <TableCell className="font-semibold text-gray-700">Stok Miktarı</TableCell>
              <TableCell align="center" className="font-semibold text-gray-700">
                Resim
              </TableCell>
              <TableCell align="center" className="font-semibold text-gray-700">
                İşlemler
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-gray-600">{product.code}</TableCell>
                  <TableCell className="text-green-600 font-medium">
                    ₺{product.unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-gray-600">{product.stockQuantity}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-contain rounded-md border border-gray-200"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => navigate(`/update-product/${product.id}`)} className="px-4 py-1 text-black bg-blue-200 border border-blue-600 rounded hover:bg-blue-300 transition-all duration-200 text-sm">
                        Düzenle
                      </button>
                      <button onClick={() => handleOpenDialog(product.id)} className="px-4 py-1 text-black bg-red-200 border border-red-600 rounded hover:bg-red-300 transition-all duration-200 text-sm"
                      >
                        Sil
                      </button>
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
  );
}