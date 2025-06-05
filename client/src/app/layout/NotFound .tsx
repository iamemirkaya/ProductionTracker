

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl">Sayfa Bulunamadı</p>
      <a href="/" className="mt-4 text-blue-500">Ana Sayfaya Dön</a>
    </div>
  );
};

export default NotFound;