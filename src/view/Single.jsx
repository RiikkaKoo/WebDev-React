import { useLocation, useNavigate } from "react-router";

const Single = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state;

  console.log(item);

  if (!item) return null;
  const isImage = item.media_type.startsWith("image");

  const mediaContent = isImage ? (
    <img
      src={item.filename}
      alt={item.title}
      style={{ maxWidth: "100%", borderRadius: "12px" }}
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
          <h1>Single Item:</h1>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <div>{mediaContent}</div>
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      )}
    </>
  );
};

export default Single;
