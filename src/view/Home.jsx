import { useEffect, useState } from "react";

import MediaRow from "../components/MediaRow";
import SingleView from "../components/SingleView";

const fetchData = async (url, options = {}) => {
  // console.log('fetching data from url: ', url);
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    // console.log('json', json);
    if (json.message) {
      throw new Error(json.message);
    }
    throw new Error(`Error ${response.status} occured`);
  }
  return json;
};

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    const media = await fetchData(import.meta.env.VITE_MEDIA_API + "/media");

    const newArray = await Promise.all(
      media.map(async (item) => {
        const result = await fetchData(
          import.meta.env.VITE_AUTH_API + "/users/" + item.user_id
        );
        return { ...item, username: result.username };
      })
    );

    setMediaArray(newArray);
  };

  useEffect(() => {
    getMedia();
  }, []);

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
