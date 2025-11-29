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
      <h2 className="viewHeader">MEDIA</h2>
      <table className="w-11/12 bg-neutral-900 m-auto">
        <thead>
          <tr className=" *:p-2.5 *:border border-amber-800">
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
        <tbody className=" *:p-2.5">
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
