import type { ProductLog } from "../../app/models/ProductionLog";


type Props = {
    productionLogs: ProductLog[]
}

export default function ProductList({ productionLogs }: Props) {
    // Gelen veri boşsa veya dizi değilse, boş bir fragment döndürerek hatayı önle
    if (!productionLogs || productionLogs.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <div className="text-gray-400 text-6xl mb-4">📋</div>
        <p className="text-gray-500">Görüntülenecek üretim kaydı bulunamadı.</p>
      </div>
    );
  }
    
    return (
         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <span className="mr-2">📊</span>
          Üretim Kayıtları
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Atölye
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vardiya
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ürün
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Devamsız Sayısı
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Üretilen Miktar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productionLogs.map((log, index) => (
              <tr key={log.id} className={`hover:bg-gray-50 transition-colors duration-150 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="mr-2">🏭</span>
                    {log.workshopName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="mr-2">⏱️</span>
                    {log.shiftName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="mr-2">📦</span>
                    {log.productName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    log.absenceCount === 0 
                      ? 'bg-green-100 text-green-800' 
                      : log.absenceCount <= 2 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {log.absenceCount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-gray-900">
                  {log.producedQuantity.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
}