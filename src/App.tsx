
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { AppRoutes } from './routes/routes';

function App() {
  return (
    <div className="App">

      <header>
        <h1>Header do site</h1>
        {/* <Navibar /> */}
        
      </header>
      <hr />

      <AppRoutes />

    </div>
  );
}

export default App;
