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
import DogList from '../pages/DogList';
import DogForm from '../pages/DogForm';
import EventList from '../pages/EventList';
import EventForm from '../pages/EventForm';

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
            <Route path="/dogs" element={<DogList />} />
            <Route path="/dogs/new" element={<DogForm />} />
            <Route path="/dogs/:dogId" element={<DogForm />} />
            <Route path="/dogs/:dogId/events" element={<EventList />} />
            <Route path="/dogs/:dogId/events/new" element={<EventForm />} />
            <Route path="/dogs/:dogId/events/:eventId" element={<EventForm />} />
            <Route path="/minha-conta" element={<MinhaConta />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </>
      ) : null}
    </BrowserRouter>
  );
}
