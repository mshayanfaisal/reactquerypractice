import { Route, Routes } from "react-router-dom";
import "./App.css";
import PostsList from "./components/PostsList";
import Post from "./components/Post";
import EditPost from "./components/EditPost";

function App() {
  return (
    <div className="my-container">
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
