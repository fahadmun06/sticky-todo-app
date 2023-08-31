import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import Routes from './pages/Routes'
import { useAuthContext } from './contexts/AuthContext';

function App() {
  const { isAppLoading } = useAuthContext();
  if (isAppLoading) return (
    <main className="d-flex justify-content-center align-items-center bg-white">
      <div className='spinner-border text-info' style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
    </main>
  )
  return (
    <>
      <Routes />
    </>
  );
}
export default App;
