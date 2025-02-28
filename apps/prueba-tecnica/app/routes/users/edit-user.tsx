// apps/prueba-tecnica/app/routes/users/edit-user.tsx

// Tengo un error: "No route matches URL '/users/edit/1'" al intentar editar un usuario.
// ¿Podrías sugerirme cómo depurar o ajustar la configuración de rutas?
// apps/prueba-tecnica/app/routes/users/edit-user.tsx
import { db } from "@repo/db";
import { redirect, useLoaderData, Form } from "react-router";
import { eq } from "drizzle-orm";
import { userTable } from "@repo/db/schema";

export const loader = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await db.query.userTable.findFirst({
    where: (u) => eq(u.id, Number(userId)),
  });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return user;
};

export const action = async ({ request, params }: { request: Request; params: { userId: string } }) => {
  // Obtenemos y limpiamos los datos del formulario
  const formData = await request.formData();
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();

  // Validamos que los campos obligatorios tengan valor
  if (!firstName || !lastName || !email) {
    return new Response("Todos los campos requeridos deben ser completados", { status: 400 });
  }

  // Validamos el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response("El formato del email es incorrecto", { status: 400 });
  }

  // Validamos el teléfono, si se proporciona, que tenga entre 7 y 15 dígitos
  if (phone && !/^\d{7,15}$/.test(phone)) {
    return new Response("El teléfono debe contener entre 7 y 15 dígitos", { status: 400 });
  }

  try {
    // Actualizar el usuario en la base de datos
    await db.update(userTable)
      .set({ firstName, lastName, email, phone })
      .where(eq(userTable.id, Number(params.userId)));
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return new Response("Error al actualizar usuario", { status: 500 });
  }

  // Redirigir a la lista de usuarios después de la actualización
  return redirect("/users");
};

const EditUser = () => {
  const user = useLoaderData<typeof loader>();

  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">
            First Name:
            <input
              type="text"
              name="firstName"
              defaultValue={user.firstName}
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
              defaultValue={user.lastName}
              required
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
              defaultValue={user.email}
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
              defaultValue={user.phone || ""}
              pattern="[0-9]{7,15}"
              title="El teléfono debe contener entre 7 y 15 dígitos."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Actualizar
        </button>
      </Form>
    </div>
  );
};

export default EditUser;
