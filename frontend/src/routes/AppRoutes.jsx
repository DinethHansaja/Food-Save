import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Food from "../pages/Food/Food";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import FoodDetails from "../pages/Food/FoodDetails";
import AddFoodListing from "../pages/Business/AddFoodListing";
import MyRequests from "../pages/Recipient/MyRequests";
import BusinessRequests from "../pages/Business/BusinessRequests";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<Home />} />

      <Route path="/food" element={<Food />} />
      <Route path="/food/:id" element={<FoodDetails />} />

      <Route
        path="/business/add-food"
        element={<AddFoodListing />}
      />

<Route
  path="/business/requests"
  element={<BusinessRequests />}
/>
      <Route
        path="/recipient/requests"
        element={<MyRequests />}
      />
    </Routes>

    
  );
};

export default AppRoutes;