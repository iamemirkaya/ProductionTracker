import { Button, Paper, TextField, Typography } from "@mui/material";
import { Upload } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useUpdateProductMutation } from "./productApi";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";


export default function UpdateProduct() {
    const { id } = useParams();
    const { data: product, isLoading: isFetching, isError } = useGetProductByIdQuery(id!);
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setFormState(prev => ({
        ...prev,
        [name]: files ? files[0] : value,
        }));
    };

    const [formState, setFormState] = useState({
    name: '',
    code: '',
    unitPrice: '',
    stockQuantity: '',
    file: null as File | null,
    });

    useEffect(() => {
    if (product) {
        setFormState({
        name: product.name,
        code: product.code,
        unitPrice: product.unitPrice.toString(),
        stockQuantity: product.stockQuantity.toString(),
        file: null, 
        });
    }
    }, [product]);

    const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

        const formData = new FormData();
        formData.append("Id", id!); // <== backend güncelleme için Id bekliyorsa
        formData.append("Name", formState.name);
        formData.append("Code", formState.code);
        formData.append("UnitPrice", formState.unitPrice);
        formData.append("StockQuantity", formState.stockQuantity);

        if (formState.file) {
            formData.append("File", formState.file);
        }

        try {
            await updateProduct(formData).unwrap();
            alert("Ürün başarıyla güncellendi.");
        } catch (error) {
        alert("Ürün güncellenirken hata oluştu.");
        }
        };

    if (isFetching || isUpdating) {return <LoadingSpinner open={true} />;}
    if (isError) return <Typography color="error">Veriler yüklenirken hata oluştu.</Typography>;

  return (
    <Paper className="max-w-xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Ürün Güncelle</h2>
      </div>

      <div className="space-y-6">
        <TextField
          label="Ürün Adı"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <TextField
          label="Ürün Kodu"
          name="code"
          value={formState.code}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <TextField
          label="Birim Fiyatı"
          name="unitPrice"
          type="number"
          value={formState.unitPrice}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <TextField
          label="Stok Miktarı"
          name="stockQuantity"
          type="number"
          value={formState.stockQuantity}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Resmi</label>
          <div className="relative">
            <label className="cursor-pointer">
              <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
                {/* Varsayılan hali: resim seçilmedi */}
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-600">Ürün Resmi Seçin</span>
              </div>
              <input
                accept="image/*"
                type="file"
                name="file"
                onChange={() => {}}
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
          Ürünü Güncelle
        </Button>
      </div>
    </Paper>
  )
}
