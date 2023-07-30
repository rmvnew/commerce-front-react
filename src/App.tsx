
import { ToastContainer } from 'react-toastify';
import './App.css';
import { AppRoutes } from './routes/routes';

function App() {
  return (
    <div className="App">

      <AppRoutes />
      <ToastContainer />

    </div>
  );
}

export default App;
