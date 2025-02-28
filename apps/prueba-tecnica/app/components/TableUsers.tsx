import React from "react";
import { Link } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface TableUsersProps {
  users: User[];
}

const TableUsers: React.FC<TableUsersProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      {/* Tabla visible en pantallas grandes */}
      <table className="min-w-full bg-white hidden sm:table">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Apellido</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Teléfono</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone || "N/A"}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/edit-user/${user.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vista tipo tarjeta para móviles */}
      <div className="sm:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Teléfono:</strong> {user.phone || "N/A"}
            </p>
            <div className="mt-2">
              <Link
                to={`/edit-user/${user.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
              >
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableUsers;
