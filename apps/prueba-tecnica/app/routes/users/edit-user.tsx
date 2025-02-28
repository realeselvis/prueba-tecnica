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
  const formData = await request.formData();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  // Actualizar el usuario en la base de datos
  await db.update(userTable)
    .set({ firstName, lastName, email, phone })
    .where(eq(userTable.id, Number(params.userId)));

  // Redirigir a la lista de usuarios después de la actualización
  return redirect("/users");
};

const EditUser = () => {
  const user = useLoaderData<typeof loader>();

  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div>
      <h1>Editar Usuario</h1>
      <Form method="post">
        <div>
          <label>
            First Name:
            <input type="text" name="firstName" defaultValue={user.firstName} required />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input type="text" name="lastName" defaultValue={user.lastName} required />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" defaultValue={user.email} required />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input type="text" name="phone" defaultValue={user.phone || ""} />
          </label>
        </div>
        <button type="submit">Actualizar</button>
      </Form>
    </div>
  );
};

export default EditUser;
