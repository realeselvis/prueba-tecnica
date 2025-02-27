import React from "react";

const UsersList = () => {
  const users = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {users.map((user) => (
        <div key={user.id} className="mb-2 border p-2">
          {user.firstName} {user.lastName} - {user.email}
        </div>
      ))}
    </div>
  );
};

export default UsersList;
