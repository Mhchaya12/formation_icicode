import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css"
import data from './data';
import Product from './components/Product';
import HomeScreen from './screens/HomeScreen';
import{BrowserRouter , Routes , Route} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
      <div>
        <a className="brand" href="/">Smart City</a>
      </div>
      <div>
        <a href="/cart">Cart</a>
        <a href="/signin">Sign In</a>
      </div>
    </header>
    <main>
      <Routes>
        <Route path='/'element={<HomeScreen/>}></Route>
        <Route path='/product/:id'element={<ProductScreen/>}></Route>

      </Routes>
    </main>
    <footer className="row center">All right reserved</footer>
  </div>
  </BrowserRouter>

  );
}

export default App;
