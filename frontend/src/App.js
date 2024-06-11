import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './screens/Home/Home';
import Auth from './screens/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SingleCar from './screens/SingleCar/SingleCar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/fleet/:id',
    element: <SingleCar />
  }
])

function App() {
  return (
    <main>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </main>
  );
}

export default App;
