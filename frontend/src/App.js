import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './screens/Home/Home';
import Auth from './screens/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SingleCar from './screens/SingleCar/SingleCar';
import Dashboard from './screens/Dashboard/Dashboard';
import AdminDashboard from './screens/AdminDashboard/AdminDashboard';
import NewListing from './screens/NewListing/NewListing';

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
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/admin-dashboard',
    element: <AdminDashboard />
  },
  {
    path: '/new-listing',
    element: <NewListing />
  }
])

function App() {
  return (
    <main>
      <Navbar router={router} />
      <RouterProvider router={router} />
      <Footer />
    </main>
  );
}

export default App;
