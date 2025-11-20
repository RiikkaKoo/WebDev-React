import { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";

const MEDIA_API = import.meta.env.VITE_MEDIA_API + "/media";
const AUTH_API = import.meta.env.VITE_AUTH_API + "/users/";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    try {
      const getMedia = async () => {
        const mediaData = await fetchData(MEDIA_API);

        const newArray = await Promise.all(
          mediaData.map(async (item) => {
            const user = await fetchData(AUTH_API + item.user_id);
            return { ...item, username: user.username };
          })
        );
        // console.log(newArray);
        setMediaArray(newArray);
      };
      getMedia();
    } catch (error) {
      console.log("ERROR", error);
    }
  }, []);
  return { mediaArray };
};

export { useMedia };
