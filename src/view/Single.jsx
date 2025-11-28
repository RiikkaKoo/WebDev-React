import { useLocation, useNavigate } from "react-router-dom";
import Likes from "../components/Likes";

const Single = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state;

  //console.log("State: ", state);
  //console.log(item);

  if (!item) return null;
  const isImage = item.media_type.startsWith("image");

  const mediaContent = isImage ? (
    <img
      src={item.filename}
      alt={item.title}
      style={{ maxWidth: "30%", borderRadius: "12px", margin: "auto" }}
    />
  ) : (
    <video controls width="500">
      <source src={item.filename} type={item.media_type} />
      Your browser does not support the video tag.
    </video>
  );

  return (
    <>
      {item && (
        <div id="single-view">
          <h2>Media item:</h2>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <p>
            By {item.username} at{" "}
            {new Date(item.created_at).toLocaleString("fi", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
          <div>{mediaContent}</div>
          <Likes mediaId={item.media_id} />
          <button
            className="bg-amber-600 font-semibold p-2.5 m-1.5 hover:bg-amber-800 w-40 rounded-md"
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      )}
    </>
  );
};

export default Single;
