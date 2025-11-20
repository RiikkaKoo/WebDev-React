import { useEffect, useState } from "react";
import fetchData from "../utils/fetchData.js";

import MediaRow from "../components/MediaRow";
import SingleView from "../components/SingleView";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaArray, setMediaArray] = useState([]);

  const MEDIA_API = import.meta.env.VITE_MEDIA_API + "/media";
  const AUTH_API = import.meta.env.VITE_AUTH_API + "/users/";

  try {
    const getMedia = async () => {
      const media = await fetchData(MEDIA_API);

      const newArray = await Promise.all(
        media.map(async (item) => {
          const user = await fetchData(AUTH_API + item.user_id);
          return { ...item, username: user.username };
        })
      );

      setMediaArray(newArray);
    };

    useEffect(() => {
      getMedia();
    }, []);
  } catch (error) {
    console.log(error);
  }

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
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
