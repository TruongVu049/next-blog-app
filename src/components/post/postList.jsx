import PostCard from "@/components/post/postCard.jsx";
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
