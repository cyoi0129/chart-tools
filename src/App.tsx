import { FC, useEffect, useState } from 'react';
import { Route, Navigate, useNavigate, useLocation, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch } from './app/hooks';
import { Home, Charts, Chart, Performance, Login, Reference } from './pages';
import { ScrollToTop, Header } from './components';
import { setUserStatusSlice } from './features/UserData';
import { getChartList } from './features/ChartList';
import './css/App.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userName = Cookies.get('firebase_user');
  const [reload, setReload] = useState<boolean>(false);

  window.addEventListener('load', () => { // Watching reload events
    const perfEntries = performance.getEntriesByType('navigation');
    setReload((perfEntries[0] as any).type === "reload");
  });

  useEffect(() => { // Check user cookie at first access and save to user store
    if (userName) {
      dispatch(setUserStatusSlice({ login: true, user: userName }));
      dispatch(getChartList());
    } else {
      dispatch(setUserStatusSlice({ login: false, user: '' }));
    }
  }, []);

  useEffect(() => { // Prevent access to charts before login
    if (!userName && location.pathname.includes('chart')) navigate('/login');
  }, [location]);

  useEffect(() => { // Create new chart page reload will case error, redirect to list page when it happens
    if (reload && location.pathname.includes("/chart/")) navigate("/charts");
  },[reload]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/chart/:chartID" element={<Chart />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
