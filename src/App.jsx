import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";

import SignupPage from "./pages/SignupPage";
import Login from "./pages/LoginPage";

import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";

import Error from "./pages/ErrorPage";
import IsPrivate from "./context/auth.private";
import IsAdmin from "./context/auth.admin";


import Activities from "./pages/Activities";
import ActivityDetails from "./pages/ActivityDetails";
import ActivityCreate from "./pages/ActivityCreate";

import Lists from "./pages/Lists";
import ListDetails from "./pages/ListDetails";
import ListCreate from "./pages/ListCreate";


function App() {
  return (
    <>
      <Navbar />
      <div id="main-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activities/:activityId" element={<ActivityDetails />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/lists/:listId" element={<ListDetails />} />
        <Route path="/lists/" element={<Lists />} />
        <Route path="/profile" element={<Profile/>}/>  
        <Route path="*" element={<Error />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
