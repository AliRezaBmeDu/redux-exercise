import Navbar from './components/Navbar';
import Modal from './components/Modal';
import CartContainer from './components/CartContainer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from './features/cart/cartSlice';
import { useEffect } from 'react';

function App() {
  const {cartItems} = useSelector((store) => store.cart)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  return (
    <main className="App">
      <Modal />
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
