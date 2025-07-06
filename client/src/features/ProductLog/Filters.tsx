import SelectBox from "../../app/shared/components/SelectBox";
import { useGetAllWorkshopsQuery } from "../workshop/workshopApi";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";
import { Typography } from "@mui/material";
import { mapWorkshopsToOptions,mapShiftsToOptions,mapProductsToOptions } from "../../app/utils/mapToOptions";
import { useGetAllProductsQuery } from "../product/productApi";
import { useGetAllShiftsQuery } from "../shift/shiftApi";


type Props = {
  onFilterChange: (filters: {
    workshopId: string;
    shiftId: string;
    productId: string;
  }) => void;
  currentFilters: {
    workshopId: string;
    shiftId: string;
    productId: string;
  };
};

export default function Filters({ onFilterChange, currentFilters }: Props) {

  const { data: workshops, isLoading, isError } = useGetAllWorkshopsQuery();
  const { data: shifts, isLoading: isLoadingShifts } = useGetAllShiftsQuery();
  const { data: products, isLoading: isLoadingProducts } = useGetAllProductsQuery();

  if (isLoading || isLoadingShifts || isLoadingProducts) return <LoadingSpinner open={true} />;
  if (isError) return <Typography color="error">Veriler yüklenirken hata oluştu.</Typography>;

    const workshopOptions = mapWorkshopsToOptions(workshops);
    const shiftOptions = mapShiftsToOptions(shifts);
    const productOptions = mapProductsToOptions(products);


    const handleShiftChange = (value: string) => {
    onFilterChange({ ...currentFilters, shiftId: value });
  };

  const handleProductChange = (value: string) => {
    onFilterChange({ ...currentFilters, productId: value });
  };
  
  const handleWorkshopChange = (value: string) => {
    onFilterChange({ ...currentFilters, workshopId: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">🔍</span>
        Filtreler
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectBox
          label="Atölye"
          options={workshopOptions}
          onChange={handleWorkshopChange}
        />
        <SelectBox
          label="Vardiya"
          options={shiftOptions}
          onChange={handleShiftChange}
        />
        <SelectBox
          label="Ürün"
          options={productOptions}
          onChange={handleProductChange}
        />
      </div>
    </div>
  )
}
