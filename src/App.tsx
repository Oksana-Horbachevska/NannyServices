import { Routes, Route } from "react-router-dom";
import { initAuthListener } from "./store/authStore";

import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Nannies from "./pages/Nannies/Nannies";
import Favorites from "./pages/Favorites/Favorites";
import { useEffect } from "react";
import PrivateRoute from "./router/PrivateRoute";

const App = () => {
  useEffect(() => {
    initAuthListener();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="nannies" element={<Nannies />} />
        <Route
          path="favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
