import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelector, State } from '~/redux/slicers/auth';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import UserList from '../pages/UserList';
import UserForm from '../pages/UserForm';
import NavigationBar from '~/components/NavigationBar';
import MyAccount from '../pages/MyAccount';
import DogList from '~/pages/DogList';
import DogForm from '~/pages/DogForm';
import EventList from '~/pages/EventList';
import EventForm from '~/pages/EventForm';
import Loader from '~/pages/Loader';
import BroodForm from '~/pages/BroodForm';
import BroodList from '~/pages/BroodList';
import ChangePassword from '~/pages/ChangePassword';

export default function Router() {
  const auth: State = useSelector(authSelector);

  return (
    <BrowserRouter>
      {auth.loading === 'pending' ? (
        <Routes>
          <Route path="*" element={<Loader />} />
        </Routes>
      ) : null}

      {/* unauthenticated routes */}
      {auth.loading !== 'pending' && !auth.user ? (
        <Routes>
          <Route index element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : null}

      {/* authenticated routes */}
      {auth.loading !== 'pending' && auth.user ? (
        <>
          <NavigationBar />
          <Routes>
            <Route index element={<Dashboard />} />

            <Route path="/user" element={<UserList />} />
            <Route path="/user/new" element={<UserForm />} />
            <Route path="/user/:userId" element={<UserForm />} />

            <Route path="/dog" element={<DogList />} />
            <Route path="/dog/new" element={<DogForm />} />
            <Route path="/dog/:dogId" element={<DogForm />} />

            <Route path="/brood" element={<BroodList />} />
            <Route path="/brood/new" element={<BroodForm />} />
            <Route path="/brood/:broodId" element={<BroodForm />} />

            <Route path="/dog/:dogId/event" element={<EventList />} />
            <Route path="/dog/:dogId/event/new" element={<EventForm />} />
            <Route path="/dog/:dogId/event/:eventId" element={<EventForm />} />

            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </>
      ) : null}
    </BrowserRouter>
  );
}
