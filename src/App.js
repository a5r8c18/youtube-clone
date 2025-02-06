import Home from './pages/Home'; 
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <Home />
      <div className='flex mt-2'>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
