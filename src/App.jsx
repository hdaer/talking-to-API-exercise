import { useState, useEffect } from "react";
import { UserDetail } from "./UserDetail";

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
  return (
    <div className="App">
      <h1>Talking to API exercise: Blogging Site</h1>
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
