import { useState, useEffect } from "react";
const App = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const friends = await response.json();
      setUsers(friends);
      console.log(friends);
      console.log(friends[2]);
      console.log(friends[2].name);
    };
    fetchUsers();
  }, []);
  return (
    <div className="App">
      <h1>Talking to API exercise: Blogging Site</h1>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
};
export default App;
