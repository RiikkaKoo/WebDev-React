const SingleView = (props) => {
  const { item, setSelectedItem } = props;

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
        <dialog open>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <div>{mediaContent}</div>
          <button onClick={() => setSelectedItem(null)}>Close</button>
        </dialog>
      )}
    </>
  );
};

export default SingleView;
