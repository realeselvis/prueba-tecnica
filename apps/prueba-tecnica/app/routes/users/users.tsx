import { db } from '@repo/db';
import { useLoaderData, Link } from 'react-router-dom';
import TableUsers from "~/components/TableUsers";

export const loader = async () => {
  const AllUsers = await db.query.userTable.findMany();
  console.log("Usuarios cargados:", AllUsers);
  return { AllUsers };
};

function AllUsers() { 
  const data = useLoaderData<typeof loader>();
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Usuarios</h1>
      
      {/* Botón para crear nuevo usuario */}
      <Link
        to="/users/new"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-block mb-4"
      >
        Crear Usuario
      </Link>

      {/* Si se encontraron usuarios, se muestra la tabla; de lo contrario, se muestra un mensaje */}
      {data.AllUsers && data.AllUsers.length > 0 ? (
        <TableUsers users={data.AllUsers} />
      ) : (
        <p className="text-gray-500">No se encontraron usuarios.</p>
      )}
    </div>
  );
}

export default AllUsers;
