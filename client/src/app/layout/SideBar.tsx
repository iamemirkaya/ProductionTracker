import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all duration-300 ${open ? "w-60" : "w-16"} relative`}>
      {/* Aç/Kapat Simge */}
      <button
        onClick={() => setOpen(!open)}
        className={`absolute top-4 right-4 text-2xl transition-colors duration-300 ${
          open ? "text-red-500 hover:text-red-400" : "text-green-400 hover:text-green-300" // Değişiklik burada: açıkken kırmızı, kapalıyken yeşil
        }`}
        title={open ? "Menüyü Kapat" : "Menüyü Aç"}
      >
        {open ? "✕" : "☰"} {/* Değişiklik burada: açıkken çarpı, kapalıyken hamburger ikonu */}
      </button>

      {open && <h2 className="text-xl font-bold mt-16 ml-4 mb-8">Üretim Takip</h2>}

      <nav className={`flex flex-col space-y-4 ${open ? "ml-4" : "items-center mt-16"}`}>
        <Link to="/" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">
          {open ? "Dashboard" : "🏠"}
        </Link>
        <Link to="/product" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">
          {open ? "Ürünler" : "📦"}
        </Link>
        <Link to="/productadd" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">           
          {open ? "Ürün Ekle" : "➕"}         
        </Link> 
      </nav>
    </div>
  );
}