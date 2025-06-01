import { Outlet } from 'react-router-dom';
import SideBar from './SideBar'; // senin Sidebar bileşenin buysa

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;