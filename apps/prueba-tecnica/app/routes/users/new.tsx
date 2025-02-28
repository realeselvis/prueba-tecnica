import { db } from "@repo/db";
import { userTable } from "@repo/db/schema";
import { redirect, Form } from "react-router";

// Acción para manejar el envío del formulario (POST)
export const action = async ({ request }: { request: Request }) => {
  // Obtenemos los datos del formulario
  const formData = await request.formData();
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();

  // Validamos que los campos requeridos tengan valor
  if (!firstName || !lastName || !email) {
    return new Response("Todos los campos requeridos deben ser completados", { status: 400 });
  }

  // Validamos el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response("El formato del email es incorrecto", { status: 400 });
  }

  // Validamos el teléfono si se proporciona, debe contener entre 7 y 15 dígitos
  if (phone && !/^\d{7,15}$/.test(phone)) {
    return new Response("El teléfono debe contener entre 7 y 15 dígitos", { status: 400 });
  }

  // Intentamos insertar el nuevo usuario en la base de datos
  try {
    await db.insert(userTable).values({
      firstName,
      lastName,
      phone,
      email,
    });
  } catch (error) {
    console.error("Error al insertar usuario:", error);
    return new Response("Error al crear usuario", { status: 500 });
  }

  // Si todo sale bien, redirigimos a la lista de usuarios
  return redirect("/users");
};

const NewUser = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">
            First Name:
            <input
              type="text"
              name="firstName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Last Name:
            <input
              type="text"
              name="lastName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Phone:
            <input
              type="text"
              name="phone"
              pattern="[0-9]{7,15}"
              title="El teléfono debe contener entre 7 y 15 dígitos."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Email:
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create User
        </button>
      </Form>
    </div>
  );
};

export default NewUser;
