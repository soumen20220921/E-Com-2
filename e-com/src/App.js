import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import { useAppContext } from "./context/AppContext";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Categories from "./pages/Categories";
import HotSalesPage from './pages/HotSalesPage'; 
import NewArrivalsPage from './pages/NewArrivalsPage';

const App = () => {
  const context = useAppContext();
  // console.log(context.login);
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotsales" element={<HotSalesPage />} />
            <Route path="/newarrivals" element={<NewArrivalsPage />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/account"
              element={context.login ? <Account /> : <Auth />}
            />
            <Route path="/cart" element={context.login ? <Cart /> : <Auth />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
