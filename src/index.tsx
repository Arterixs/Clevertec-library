import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthForm } from './components/auth/form-auth';
import { PassForm } from './components/auth/form-pass';
import { RegisterForm } from './components/auth/form-register';
import { ContractPage } from './components/contract-page/contract-page';
import { OfertaPage } from './components/oferta-page/oferta-page';
import { AuthPage } from './pages/auth/auth-page';
import { BookPage } from './pages/book';
import { Layout } from './pages/layout/layout-page';
import { LayoutMainPage } from './pages/layout-main-page/layout-main-page';
import { MainPage } from './pages/main';
import { PrivateRoute } from './pages/private-route/private-route';
import { Profile } from './pages/profile/profile';
import { store } from './store/store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route element={<LayoutMainPage />}>
              <Route element={<Navigate to='/books/all' />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/books/oferta' element={<OfertaPage />} />
              <Route path='/books/contract' element={<ContractPage />} />
            </Route>
            <Route path='/books/:category/:id' element={<BookPage />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route element={<AuthPage />}>
            <Route path='/auth' element={<AuthForm />} />
            <Route path='/registration' element={<RegisterForm />} />
            <Route path='/forgot-pass' element={<PassForm />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
