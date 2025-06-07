import { useState } from "react";
import { Button, TextField, Typography, Paper } from '@mui/material';
import { useAddProductMutation } from "./productApi";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";
import { Upload, Image } from 'lucide-react';


export default function ProductAdd() {

  const [addProduct, { isLoading}] = useAddProductMutation();
  const [errorMessage, setErrorMessage] = useState('');

  const [formState, setFormState] = useState({
    name: '',
    code: '',
    unitPrice: '',
    stockQuantity: '',
    file: null as File | null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setFormState(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    
    const formData = new FormData();
    formData.append('Name', formState.name);
    formData.append('Code', formState.code);
    formData.append('UnitPrice', formState.unitPrice);
    formData.append('StockQuantity', formState.stockQuantity);

    if (formState.file) {
      formData.append('File', formState.file);
    }

    try {
        await addProduct(formData).unwrap();
        alert('Ürün başarıyla eklendi.');
    } catch (error) {
        const apiError = error as {
        data?: {
            StatusCode: number;
            Errors: string[];
          }
      };
      if (apiError.data && Array.isArray(apiError.data.Errors)) {
          setErrorMessage(apiError.data.Errors.join(', '));
      } else {
          setErrorMessage('Beklenmeyen bir hata oluştu.');
      }
}
  };

  if (isLoading) return <LoadingSpinner open={true} />;

  return (
    <Paper className="max-w-xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Ürün Ekle</h2>
      </div>

      <div onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label="Ürün Adı"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          required={true}
        />

        <TextField
          label="Ürün Kodu"
          name="code"
          value={formState.code}
          onChange={handleInputChange}
          required={true}
        />

        <TextField
          label="Birim Fiyatı"
          name="unitPrice"
          type="number"
          value={formState.unitPrice}
          onChange={handleInputChange}
          required={true}
        />

        <TextField
          label="Stok Miktarı"
          name="stockQuantity"
          type="number"
          value={formState.stockQuantity}
          onChange={handleInputChange}
          required={true}
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Resmi</label>
          <div className="relative">
            <label className="cursor-pointer">
              <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
                {formState.file ? (
                  <>
                    <Image className="w-8 h-8 text-green-500 mb-2" />
                    <span className="text-green-600 font-medium">Seçilen resim: {formState.file.name}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-600">Ürün Resmi Seçin</span>
                  </>
                )}
              </div>
              <input
                accept="image/*"
                type="file"
                name="file"
                onChange={handleInputChange}
                required
                className="hidden"
              />
            </label>
          </div>
        </div>

        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          className="mt-8 py-4 text-lg font-semibold"
        >
          Ürünü Kaydet
        </Button>

        {errorMessage && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <Typography color="error" className="text-center font-medium">
              {errorMessage}
            </Typography>
          </div>
        )}
      </div>
    </Paper>
  )
}
