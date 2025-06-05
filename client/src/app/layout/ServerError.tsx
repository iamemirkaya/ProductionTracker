import { useLocation } from "react-router-dom";

const ServerError = () => {
  const location = useLocation();
  const error = location.state?.error;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">500 - Sunucu Hatası</h1>
      <p className="text-xl">
        Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyin.
      </p>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-500">
          <strong>Hata Detayı:</strong>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      <a href="/" className="mt-4 text-blue-500">Ana Sayfaya Dön</a>
    </div>
  );
};

export default ServerError;