import { db } from '@repo/db';
import { useLoaderData } from 'react-router';
import TableUsers from "~/components/TableUsers";

export const loader = async () => {

    const AllUsers = await db.query.userTable.findMany();
   
    console.log(AllUsers);
   
    return {
     AllUsers
    };
   
   
   }

function AllUsers() { 

    const users = useLoaderData<typeof loader>();
    return(
    <div>
        <h1>Usuarios.</h1>
        <TableUsers users={users.AllUsers} />
    </div>
    )
        
    }

export default AllUsers;

