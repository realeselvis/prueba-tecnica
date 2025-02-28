interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  const TableUsers: React.FC<{ users: User[] }> = ({ users }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default TableUsers;