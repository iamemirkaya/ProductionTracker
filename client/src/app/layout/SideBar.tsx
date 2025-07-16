import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { useLogoutMutation } from "../../features/auth/authApi";
import { logout } from "../../features/auth/authSlice";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [apiLogout] = useLogoutMutation();
  
  const handleLogout = async () => {
    try {
      await apiLogout().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Çıkış yapılamadı:", error);
      dispatch(logout());
      navigate("/login");
    }
  };
  return (
    <div className={`h-screen bg-gray-800 text-white transition-all duration-300 ${open ? "w-60" : "w-16"} relative flex flex-col`}>
      <div className="flex-grow">
        {/* Aç/Kapat Simge */}
        <button
          onClick={() => setOpen(!open)}
          className={`absolute top-4 right-4 text-2xl transition-colors duration-300 ${
            open ? "text-red-500 hover:text-red-400" : "text-green-400 hover:text-green-300"
          }`}
          title={open ? "Menüyü Kapat" : "Menüyü Aç"}
        >
          {open ? "✕" : "☰"}
        </button>

        {open && <h2 className="text-xl font-bold mt-16 ml-4 mb-8">Üretim Takip</h2>}
        <nav className={`flex flex-col space-y-4 ${open ? "ml-4" : "items-center mt-16"}`}>
          <Link to="/" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">
            {open ? "Dashboard" : "🏠"}
          </Link>
          <Link to="/product" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">
            {open ? "Ürünler" : "�"}
          </Link>
          <Link to="/productadd" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">
            {open ? "Ürün Ekle" : "➕"}
          </Link>
          <Link to="/workshop" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">
            {open ? "Atölyeler" : "🏭"}
          </Link>
          <Link to="/createWorkshop" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">
            {open ? "Atölye Ekle" : "➕"}
          </Link>
          <Link to="/shift" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">
            {open ? "Vardiyalar" : "⏱️"}
          </Link>
          <Link to="/createShift" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">
            {open ? "Vardiya Ekle" : "➕"}
          </Link>
          <Link to="/production" className="hover:bg-gray-700 p-2 rounded text-sm w-full text-left">
            {open ? "Üretim Takip" : "📊"}
          </Link>
        </nav>
      </div>
      <div className={`p-4 border-t border-gray-700 ${!open && 'flex justify-center'}`}>
        <button
          onClick={handleLogout}
            className="flex items-center justify-center w-full bg-transparent hover:bg-red-600 p-2 rounded text-sm text-red-500 font-semibold border border-red-500 hover:text-white transition-colors duration-300"
          title="Çıkış Yap"
>
          {open ? (
            "Çıkış Yap"
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
    
  );
}