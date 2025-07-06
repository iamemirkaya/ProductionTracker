import { useState } from "react";
import Filters from "./Filters";
import ProductList from "./ProductList";
import { useGetAllProductLogsQuery } from "./productLogApi";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";



export default function Production() {

  const [filters, setFilters] = useState({
    shiftId: "",
    productId: "",
    workshopId: "",
  });

  const { data: filteredLogs, isLoading, isError,isFetching } = useGetAllProductLogsQuery(filters);
  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError || !filteredLogs) return <div>Bir hata oluştu veya veri bulunamadı.</div>;
  return (
    
    <>
      <LoadingSpinner open={isFetching} />
      
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Sayfa Başlığı */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">📊</span>
              Üretim Takip
            </h1>
            <p className="text-gray-600 mt-2">
              Atölye, vardiya ve ürün bazında üretim verilerini takip edin
            </p>
          </div>

          {/* Filtreler */}
          <Filters
            currentFilters={filters}
            onFilterChange={setFilters}
          />

          {/* Sonuçlar */}
          <div>
            {!filteredLogs || filteredLogs.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Sonuç Bulunamadı
                </h3>
                <p className="text-gray-500">
                  Seçilen filtrelere uygun sonuç bulunamadı. Lütfen farklı filtreler deneyin.
                </p>
              </div>
            ) : (
              <ProductList productionLogs={filteredLogs} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
