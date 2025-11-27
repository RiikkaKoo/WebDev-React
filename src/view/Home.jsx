import { useState } from "react";
import { useMedia } from "../hooks/apiHooks";

import MediaRow from "../components/MediaRow";
import SingleView from "../components/SingleView";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const { mediaArray, deleteMedia, modifyMedia } = useMedia();

  return (
    <>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      <h2>MEDIA</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Username and ID</th>
            <th>Size</th>
            <th>Type</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
              deleteMedia={deleteMedia}
              modifyMedia={modifyMedia}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
