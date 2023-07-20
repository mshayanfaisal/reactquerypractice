import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddPost from "./AddPost";
import { deletePost, fetchPosts } from "../api/posts";
import { useNavigate } from "react-router-dom";

const PostsList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isError,
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = (id) => {
    deletePostMutation.mutate(id);
  };

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  // console.log(posts, "post");
  return (
    <div className="overflow-auto" style={{ maxHeight: "648px" }}>
      <AddPost />
      {posts.map((post) => (
        <div key={post.id} className="bg-secondary mb-3 p-3 rounded">
          <h4
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {post.title}
          </h4>
          <button onClick={() => navigate(`/post/${post.id}/edit`)} className="btn btn-success mt-2">
            Edit
          </button>
          <button onClick={() => handleDelete(post.id)} className="btn btn-danger mt-2">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
