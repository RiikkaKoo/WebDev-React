import useForm from "../hooks/formHooks";
import { useState } from "react";
import { useFile, useMedia } from "../hooks/apiHooks";

const Upload = () => {
  const [file, setFile] = useState(null);
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
      const fileResponse = await postFile(file, token);
      console.log("Upload: ", fileResponse);
      const mediaResponse = await postMedia(fileResponse.data, inputs, token);
      console.log("Post media: ", mediaResponse);
      // TODO: Kerro käyttäjälle "onnistui"? Uudelleenohjaa toiselle "sivulle"?
    } catch (error) {
      console.log("File post error: " + error);
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
          width="200"
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
