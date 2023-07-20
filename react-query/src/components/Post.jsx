import { useNavigate, useParams } from "react-router-dom";
import { fetchPost } from "../api/posts";
import { useQuery } from "@tanstack/react-query";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isError,
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;
  return (
    <div>
      <button onClick={() => navigate("/")}>Back to list Post</button>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
