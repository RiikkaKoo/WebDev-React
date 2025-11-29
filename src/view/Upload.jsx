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
      <h2 className="viewHeader">Upload</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-orange-50 w-1/4 m-auto p-8 text-neutral-900 rounded-sm"
      >
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>Could not upload: {error}</p>}
        <div>
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            placeholder="Type title"
            className="p-1.5 bg-neutral-50 border-2 border-amber-950 ml-2 mt-3.5 mb-3.5 text-neutral-900"
          />
        </div>
        <div className="block">
          <label htmlFor="description" className="block w-full text-left">
            Description:
          </label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            placeholder="Type description"
            className="p-1.5 bg-neutral-50 border-2 border-amber-950 mt-1.5 mb-3.5 text-neutral-900 w-full"
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
          className="bg-indigo-600 hover:bg-indigo-800 p-2.5 mt-5 font-extrabold rounded-md text-amber-50 disabled:bg-amber-900"
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
