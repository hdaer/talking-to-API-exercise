import { useState } from "react";

export const UserForm = ({ createUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createUser({ name, email, website });

    // Empty the form fields.
    setName("");
    setEmail("");
    setWebsite("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Email: </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Website: </label>
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
