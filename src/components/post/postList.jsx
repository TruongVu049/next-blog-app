import { PostCard } from "./postCard";
const PostList = ({ posts }) => {
  return (
    <>
      {posts.length
        ? posts.map((post) => <PostCard post={post} key={post.id} />)
        : null}
    </>
  );
};

export default PostList;
