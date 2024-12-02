import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NewPin from './pages/NewPin';
import NewBoard from './pages/NewBoard';
import EditPin from './pages/EditPin';
import Share from './pages/Share';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="newpin" element={<NewPin />} />
          <Route path="newboard" element={<NewBoard />} />
          <Route path="editpin/:pinId" element={<EditPin />} />
          <Route path="share" element={<Share />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
}
