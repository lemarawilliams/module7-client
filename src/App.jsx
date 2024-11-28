import { useState } from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import './App.css'
import MyPin from './components/pinGroup';
import NavigationBar from './components/navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import NewPin from './pages/NewPin';
import NewBoard from './pages/NewBoard';


export default function App() {
  const history = [];

  // return (
  //   <>
  //   //     <NavigationBar />
  //   //     <MyPin length={history.length} />
  //   //   </>
  //   // );

  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyPin length={history.length} />} />
          <Route path="home" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="newpin" element={<NewPin />} />
          <Route path="newboard" element={<NewBoard />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

      <NavigationBar />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
