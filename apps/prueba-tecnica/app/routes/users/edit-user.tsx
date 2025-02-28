import { db } from "@repo/db";
import type { Route } from "../+types/home";
import { eq } from "drizzle-orm";
import { useLoaderData } from "react-router";

export const loader = async ({ params }: Route.LoaderArgs) => {


 const { userId } = params; 

 const user = await db.query.userTable.findFirst({
  where: (u) => eq(u.id, Number(userId)),
  
});

 return user;


}

const EditUser = () => {
 
 const user = useLoaderData<typeof loader>();

 console.log(user);
  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div>
      Aqui va los datos del usuario para actualizar
      <p><b>Nombre de usuario</b> { user.firstName } </p>
      <p><b>Apellido de usuario</b> { user.lastName }</p>
      <p><b>Email de usuario</b> { user.email }</p>
      <button >Actualizar</button>
    </div>
  );
};

export default EditUser;