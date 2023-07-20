import { useNavigate, useParams } from "react-router-dom";
import PostForm from "./PostForm";
import { fetchPost, updatePost } from "../api/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const EditPost = () => {
  const queryClient = useQueryClient();
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

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  const handleSubmit = (updatedPost) => {
    updatePostMutation.mutate({ id, ...updatedPost });
  };
  return (
    <div>
      <PostForm onSubmit={handleSubmit} initialValue={post} />
    </div>
  );
};

export default EditPost;
