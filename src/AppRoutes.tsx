import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const NotFoundPage = () => (<div>Página não encontrada!</div>);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="bookings/*" element={<p>Booking routes</p>} />
        <Route path="payments/*" element={<p>Booking routes</p>} />
        <Route path="places/*" element={<p>Booking routes</p>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}