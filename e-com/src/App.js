import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Auth from './pages/Auth';
import Account from './pages/Account';
import { useAppContext } from './context/AppContext';
import  Cart from './pages/Cart';

const App = () => {

    const context = useAppContext();
    // console.log(context.login);
    return (
    <BrowserRouter> 
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productDetails/:id" element={<ProductDetails/>} />
      <Route path="/auth" element ={<Auth/>} />
      <Route path="/account" element ={context.login?<Account/>:<Auth/>} />
      <Route path="/cart" element ={context.login?<Cart/>:<Auth/>} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
