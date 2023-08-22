import { useEffect, useState } from "react";

export const UserDetail = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let ignore = false;
    setPosts([]);

    const fetchUserPosts = async () => {
      const response = await fetch(
        `http://localhost:3000/users/${user.id}/posts`
      );
      const post = await response.json();
      if (!ignore) {
        setPosts(post);
      }
    };
    fetchUserPosts();

    return () => {
      ignore = true;
    };
  }, [user.id]);

  return (
    <>
      <hr />
      <p>user: {user.name}</p>
      <p>email: {user.email}</p>
      <p>website: www.{user.website}</p>
      <hr />
      <ul>
        {posts &&
          posts.map((post) => {
            return (
              <li key={post.id}>
                <b>{post.title}:</b>
                <p>{post.body}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
};
