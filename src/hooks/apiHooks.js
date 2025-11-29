import { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";

const MEDIA_API = import.meta.env.VITE_MEDIA_API;
const AUTH_API = import.meta.env.VITE_AUTH_API + "/users";
const UPLOAD_API = import.meta.env.VITE_UPLOAD_SERVER;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    try {
      const getMedia = async () => {
        const mediaData = await fetchData(MEDIA_API + "/media");

        const newArray = await Promise.all(
          mediaData.map(async (item) => {
            const user = await fetchData(AUTH_API + "/" + item.user_id);
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

  const postMedia = async (fileData, inputs, token) => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ ...inputs, ...fileData }),
      };
      const mediaResponse = await fetchData(MEDIA_API + "/media", fetchOptions);
      return mediaResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const modifyMedia = async (media_id, inputs, token) => {
    try {
      console.log(inputs);
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(inputs),
      };
      const mediaResponse = await fetchData(
        MEDIA_API + "/media" + "/" + media_id,
        fetchOptions
      );
      return mediaResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteMedia = async (fileId, token) => {
    try {
      console.log(fileId);
      const fetchOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const deleteResponse = await fetchData(
        MEDIA_API + "/media" + "/" + fileId,
        fetchOptions
      );
      return deleteResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { mediaArray, postMedia, modifyMedia, deleteMedia };
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + "/auth/login",
      fetchOptions
    );
    return loginResult;
  };
  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const tokenResults = await fetchData(AUTH_API + "/token", options);
    return tokenResults;
  };

  const postUser = async (inputs) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputs),
      };
      const registerResults = await fetchData(AUTH_API, options);
      return registerResults;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return { getUserByToken, postUser };
};

const useFile = () => {
  const postFile = async (file, token) => {
    try {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      const options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      };
      const uploadResponse = await fetchData(UPLOAD_API + "/upload", options);
      return uploadResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return { postFile };
};

const useLikes = () => {
  const postLike = async (mediaId, token) => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ media_id: mediaId }),
      };
      const likeResponse = await fetchData(MEDIA_API + "/likes", fetchOptions);
      return likeResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteLike = async (likeId, token) => {
    try {
      const fetchOptions = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const likeResponse = await fetchData(
        MEDIA_API + "/likes/" + likeId,
        fetchOptions
      );
      return likeResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getLikesByMediaId = async (mediaId) => {
    try {
      const likeResponse = await fetchData(
        MEDIA_API + "/likes/count/" + mediaId
      );
      return likeResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getUserLike = async (mediaId, token) => {
    try {
      const fetchOptions = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const likeResponse = await fetchData(
        MEDIA_API + "/likes/bymedia/user/" + mediaId,
        fetchOptions
      );
      return likeResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { postLike, deleteLike, getLikesByMediaId, getUserLike };
};

export { useMedia, useAuthentication, useUser, useFile, useLikes };
