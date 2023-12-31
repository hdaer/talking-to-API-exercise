import { useState, useEffect } from "react";
import { UserDetail } from "./UserDetail";
import { UserForm } from "./utils/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const friends = await response.json();
      setUsers(friends);
    };
    fetchUsers();
  }, []);

  const createUser = async (user) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    user.id = (await response.json()).id;
    setUsers(users.concat(user));
  };

  return (
    <div className="App">
      <h1>Talking to API exercise: Blogging Site</h1>

      <UserForm createUser={createUser} />
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id} onClick={() => setSelectedUser(user)}>
              {user.name}
            </li>
          );
        })}
      </ul>
      {selectedUser && <UserDetail user={selectedUser} />}
    </div>
  );
};
export default App;
