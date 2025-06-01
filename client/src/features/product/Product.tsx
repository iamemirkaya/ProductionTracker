import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,} from '@mui/material';
import { useGetAllProductsQuery } from './productApi';
import LoadingSpinner from '../../app/shared/components/LoadingSpinner';

export default function Product() {
  const { data: products, isLoading, isError } = useGetAllProductsQuery();

  if (isLoading) return <LoadingSpinner open={true} />;
  if (isError) return <Typography color="error">Veriler yüklenirken hata oluştu.</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Ürün Adı</strong></TableCell>
            <TableCell><strong>Kodu</strong></TableCell>
            <TableCell><strong>Birim Fiyatı (₺)</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products && products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.code}</TableCell>
              <TableCell>{product.unitPrice.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}