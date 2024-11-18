import { PostCard } from '../cards/PostCard';
import { usePosts } from '../hooks/usePosts';
import { useDarkModeContext } from "../../context/AppContext.jsx";

export function Posts({  setOpenComments, userTypeFilter,company_id }) {
  const {
    posts,
    error,
    handleDeletePost,
    handleLikePost
  } = usePosts( userTypeFilter, company_id);
  const { darkMode } = useDarkModeContext();

  const handleDelete = (id) => {
    handleDeletePost(id);
  };


  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(270px,_1fr))] gap-12'>
      {error && <p className="text-center dark:text-white">{error}</p>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            city={post.company.canton.name}
            name={post.company.name}
            info={post.description}
            category={post.company.category.name}          
            media={Array.isArray(post.files) ? post.files.map(file => ({
              url: `http://localhost/escape-desarrollo-backend/public/storage/${file.file_path}`,
              type: file.file_type === 'image' ? 'image' : 'video',
            })) : []}
            likesCount={post.likes_count}
            darkMode={darkMode}
            setOpenComments={setOpenComments}
            handleDeletePost={handleDelete}
            handleLike={handleLikePost}
            liked={post.liked}
            companyId={post.company.id}
            profilePicture={post.company.image ? `http://localhost/escape-desarrollo-backend/public/imgs/${post.company.image}` : null}
          />
        ))
      ) : (
        <p className="text-center dark:text-white">No hay posts disponibles</p>
      )}
    </div>
  );

}

