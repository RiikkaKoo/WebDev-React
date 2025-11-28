import { useLikes } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";
import { useEffect, useState } from "react";

const Likes = ({ mediaId }) => {
  const { user } = useUserContext();
  const [likes, setLikes] = useState(0);
  const [userLikeId, setUserLikeId] = useState(0);
  const token = localStorage.getItem("token");
  const { postLike, deleteLike, getLikesByMediaId, getUserLike } = useLikes();

  const fetchUserLike = async () => {
    try {
      const response = await getUserLike(mediaId, token);
      if (response.like_id) {
        setUserLikeId(response.like_id);
      }
    } catch (error) {
      console.log("Error fetching likes: ", error);
    }
  };

  useEffect(() => {
    fetchUserLike();
  }, []);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const likeCount = await getLikesByMediaId(mediaId);
        //console.log(likeCount);
        setLikes(likeCount.count);
      } catch (error) {
        console.log("Error fetching likes: ", error);
      }
    };
    fetchLikeCount();
  }, [userLikeId]);

  const handleLike = async () => {
    console.log("Liking");
    try {
      await postLike(mediaId, token);
      fetchUserLike();
    } catch (error) {
      console.log("Error adding a like: ", error);
    }
  };

  const handleDislike = async () => {
    try {
      await deleteLike(userLikeId, token);
      setUserLikeId(0);
    } catch (error) {
      console.log("Error removing like: ", error);
    }
  };

  return (
    <>
      <div>
        <p>LIKES: {likes}</p>
        {user && (
          <>
            {userLikeId > 0 ? (
              <button
                onClick={handleDislike}
                className="bg-indigo-500 font-semibold p-0.5 m-1.5 hover:bg-indigo-700 w-28 rounded-md"
              >
                Dislike
              </button>
            ) : (
              <button
                onClick={handleLike}
                className="bg-pink-400 font-semibold p-0.5 m-1.5 hover:bg-pink-600 w-28 rounded-md"
              >
                Like
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Likes;
