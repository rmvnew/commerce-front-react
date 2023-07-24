
import './App.css';
import { Header } from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { AppRoutes } from './routes/routes';

function App() {
  return (
    <div className="App">


      <Header />

      <AppRoutes />

    </div>
  );
}

export default App;
