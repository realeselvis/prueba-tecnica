// apps/prueba-tecnica/app/routes/users/new.tsx
import { db } from "@repo/db";
import { userTable } from "@repo/db/schema";
import { redirect, Form } from "react-router";

// Acción para manejar el envío del formulario (POST)
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  // Insertar el nuevo usuario en la base de datos
  await db.insert(userTable).values({
    firstName,
    lastName,
    phone,
    email,
  });

  // Redirige a la lista de usuarios tras la creación
  return redirect("/users");
};

const NewUser = () => {
  return (
    <div>
      <h1>Create New User</h1>
      <Form method="post">
        <div>
          <label>
            First Name:
            <input type="text" name="firstName" required />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input type="text" name="lastName" required />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input type="text" name="phone" />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
        </div>
        <button type="submit">Create User</button>
      </Form>
    </div>
  );
};

export default NewUser;
