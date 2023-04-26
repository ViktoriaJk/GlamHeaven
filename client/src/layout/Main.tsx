import { FC } from 'react';
import { $user } from '../states/user';
import useGlobal from '../hooks/useGlobal';
import { login, logout } from '../states/user';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Callback } from '../components/Callback';
import { Protected } from '../components/ProtectedRoute';
import Categories from '../pages/CategoriesPage';
import Category from '../pages/CategoryPage';
import SearchPage from '../pages/SeachPage';
import { PageNotFound } from '../pages/PageNotFound';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

const Main: FC = () => {
  //const messages = useGlobal($messages, []);

  const user = useGlobal($user);

  // const navigate = useNavigate();
  // navigate('/', {}); // ??????????????

  return (
    <main>
      <Routes>
        <Route path='/' element={<div>Mainpage</div>} />
        <Route
          path='/dashboard'
          element={
            <Protected hasAccess={!!user}>
              <div>Dashboard</div>
            </Protected>
          }
        />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:url' element={<Category />} />
        <Route path='/search/:query' element={<SearchPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/finishlogin' element={<Callback />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </main>
  );
};

export default Main;
