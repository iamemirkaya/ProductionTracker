import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';


function App() {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-4 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default App;