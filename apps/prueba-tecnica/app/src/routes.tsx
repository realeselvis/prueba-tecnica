// apps/prueba-tecnica/src/routes.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";
import NotFound from "./components/NotFound";
// Importa Welcome (ajusta la ruta si es distinta)
import { Welcome } from "../../app/welcome/welcome";

console.log("UsersList:", UsersList);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal en "/" */}
        <Route path="/" element={<Welcome />} />

        {/* Listado de usuarios */}
        <Route path="/users" element={<UsersList />} />

        {/* Crear usuario */}
        <Route path="/users/new" element={<UserForm mode="create" />} />

        {/* Editar usuario */}
        <Route path="/users/edit/:userId" element={<UserForm mode="edit" />} />

        {/* Ruta comodín para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
