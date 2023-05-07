import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelector } from '../redux/slicers/auth';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Tutores from '../pages/Tutores';
import TutorForm from '../pages/TutorForm';
import NavigationBar from '../components/NavigationBar';
import MinhaConta from '../pages/MinhaConta';

export default function Router() {
  const auth = useSelector(authSelector);

  return (
    <BrowserRouter>
      {!auth.token ? (
        <Routes>
          <Route index element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : null}

      {auth.token ? (
        <>
          <NavigationBar />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/tutores" element={<Tutores />} />
            <Route path="/tutores/novo" element={<TutorForm />} />
            <Route path="/tutores/:id" element={<TutorForm />} />
            <Route path="/minha-conta" element={<MinhaConta />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      ) : null}
    </BrowserRouter>
  );
}
