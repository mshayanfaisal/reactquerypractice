import { useState } from "react";

const PostForm = ({ onSubmit, initialValue }) => {
  const [post, setPost] = useState({
    title: initialValue.title || "",
    body: initialValue.body || "",
  });
  console.log(post);

  const handleChangeInput = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const renderField = (label) => (
    <div className="form-div mb-4">
      <label>{label}</label>
      <input
        onChange={handleChangeInput}
        type="text"
        name={label.toLowerCase()}
        value={post[label.toLowerCase()]}
      />
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post);
    setPost({
      title: "",
      body: "",
    });
  };
  return (
    <div >
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        {renderField("Title")}
        {renderField("Body")}
        <button type="submit" className="btn btn-info btn-sm submit-btn mb-4">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
