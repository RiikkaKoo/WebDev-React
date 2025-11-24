import useForm from "../hooks/formHooks";
import { useState } from "react";
import { useFile, useMedia } from "../hooks/apiHooks";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { postFile } = useFile();
  const { postMedia } = useMedia();

  const initValues = {
    title: "",
    description: "",
  };

  const doUpload = async (inputs) => {
    console.log("doUpload: inputs: ", inputs, " file: ", file);
    const token = localStorage.getItem("token");
    try {
      console.log(file);
      const fileResponse = await postFile(file, token);
      console.log("Upload: ", fileResponse);
      const mediaResponse = await postMedia(fileResponse.data, inputs, token);
      console.log("Post media: ", mediaResponse);
      setError("");
      setMessage("Upload successful!");
    } catch (error) {
      console.log("File post error: ", error);
      setMessage("");
      setError(error.message);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // console.log("File state: " + file);
  };

  const { handleInputChange, handleSubmit, inputs } = useForm(
    doUpload,
    initValues
  );

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        {message && <p style={{ color: "darkgreen" }}>{message}</p>}
        {error && <p style={{ color: "darkred" }}>Could not upload: {error}</p>}
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : "https://placehold.co/600x400?text=Choose+image"
          }
          alt="preview"
        />
        <button
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
