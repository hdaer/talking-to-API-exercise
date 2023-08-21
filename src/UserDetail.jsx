export const UserDetail = ({ user }) => {
  return (
    <>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.website}</p>
      <p>{user.company.name}</p>
    </>
  );
};
