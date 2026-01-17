import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { useUiStore } from "../store/uiStore";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export default function Layout() {
  const { isLoginOpen, isRegisterOpen, closeAll } = useUiStore();
  return (
    <>
      <Header />
      {isLoginOpen && <Login onClose={closeAll} />}
      {isRegisterOpen && <Register onClose={closeAll} />}
      <main>
        <Outlet />
      </main>
    </>
  );
}
