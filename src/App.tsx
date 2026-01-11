import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Nannies from "./pages/Nannies/Nannies";
import Favorites from "./pages/Favorites/Favorites";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="nannies" element={<Nannies />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
};

export default App;
