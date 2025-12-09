import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import NavBar from './section/NavBar';
import SideBar from './section/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';
import AssetForm from './components/assets/AssetForm';
import WorkOrderForm from './components/workOrder/WorkOrderForm';
import Team from './pages/Team';
import AssetList from './components/assets/AssetList';
import WorkOrderList from './components/workOrder/WorkOrderList';
import Calendar from './pages/Calendar';
import Bar from './pages/chart/Bar';
import Pie from './pages/chart/Pie';
import Line from './pages/chart/Line';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className='app'>
            <SideBar />
            <main className='content'>
              <NavBar />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/form' element={<Form />} />
                <Route path='/asset' element={<AssetForm />} />
                <Route path='/work-order' element={<WorkOrderForm />} />
                <Route path='/team' element={<Team />} />
                <Route path='/asset-list' element={<AssetList />} />
                <Route path='/work-orders-list' element={<WorkOrderList />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/bar' element={<Bar />} />
                <Route path='/pie' element={<Pie />} />
                <Route path='/line' element={<Line />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
