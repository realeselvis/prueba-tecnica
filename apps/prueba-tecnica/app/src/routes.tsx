
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";
import NotFound from "./components/NotFound";
import { Welcome } from "../../app/welcome/welcome";

// Componente contenedor para rutas de usuarios
const UsersLayout = () => {
  return (
    <div>
      <h1>Usuarios</h1>
      {/* Aquí se renderizan las rutas hijas */}
      <Outlet />
    </div>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Welcome />} />
        {/* Rutas anidadas para /users */}
        <Route path="/users" element={<UsersLayout />}>
          {/* Ruta índice: listado de usuarios */}
          <Route index element={<UsersList />} />
          {/* Ruta para crear usuario */}
          <Route path="new" element={<UserForm mode="create" />} />
          {/* Ruta para editar usuario */}
          <Route path="edit/:userId" element={<UserForm mode="edit" />} />
        </Route>
        {/* Ruta comodín */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
