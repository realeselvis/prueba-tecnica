import React from "react";
import { useRouteError } from "react-router";

const EditUserError: React.FC = () => {
  // useRouteError devuelve el error lanzado por el loader o action de la ruta
  const error = useRouteError() as { message?: string };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">Oops!</h1>
      <p className="text-gray-700">No se encontró el usuario.</p>
      {error.message && (
        <p className="text-sm text-red-500 mt-4">{error.message}</p>
      )}
    </div>
  );
};

export default EditUserError;
