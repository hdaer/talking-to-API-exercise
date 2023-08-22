import { useEffect, useState } from "react";

const flakyFetch = async (url) => {
  // Sleep for a bit to simulate loading.
  await new Promise((r) => setTimeout(r, 1000));

  // 1/6 requests throw a JavaScript error
  const randomValue = Math.random() * 100;
  if (randomValue <= 16) {
    throw new Error("The server did not respond");
  }

  // 1/6 responses return an invalid response
  let response = await fetch(url);
  if (randomValue <= 32) {
    const data = { error: "Server error" };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const init = { status: 500, statusText: "Server Error" };
    response = new Response(blob, init);
  }
  return response;
};

export const UserDetail = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ happened: false, msg: "Error!" });

  useEffect(() => {
    let ignore = false;
    setPosts([]);
    setIsLoading(true);
    setError({ happened: false, msg: "Error!" });

    const fetchUserPosts = async () => {
      let response;

      try {
        response = await flakyFetch(
          `http://localhost:3000/users/${user.id}/posts`
        );
      } catch (err) {
        setError({
          happened: true,
          msg: err.message,
        });
        // We can't do anything useful in this function after an error happens.
        setIsLoading(false);
        return;
      }

      if (ignore) {
        return;
      }

      if (!response.ok) {
        setError({
          happened: true,
          msg: `${response.status}: ${response.statusText}`,
        });
        setIsLoading(false);
        return;
      }

      const posts = await response.json();
      setPosts(posts);
      setIsLoading(false);
    };
    fetchUserPosts();

    return () => {
      ignore = true;
    };
  }, [user]);

  if (isLoading) {
    return <p>"Loading..."</p>;
  }

  if (error.happened) {
    return <p>the following error occurred: {error.msg}</p>;
  }

  return (
    <div className="user-details">
      <p>{user.name}</p>
      <p>{user.email}</p>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <b>{post.title}</b>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
