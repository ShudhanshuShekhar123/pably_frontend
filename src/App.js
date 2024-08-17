import { ToastContainer } from 'react-toastify';
import './App.css';
import Allroutes from './Routes/Allroutes';
import Navbar from './components/Navbar';

function App() {
  return (

    <div className="App">
         <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"

                            />
      <Navbar/>
      <Allroutes />
      {/* <Allroutes /> */}
    
    
   
    </div>
  );
}

export default App;
