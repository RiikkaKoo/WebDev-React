import useForm from "../hooks/formHooks";
import { useState } from "react";

const EditDialog = ({ item, modifyMedia, onClose }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const initValues = {
    title: item.title,
    description: item.description,
    mediaId: item.media_id,
  };

  const doUpdate = async (inputs) => {
    const token = localStorage.getItem("token");
    try {
      const response = await modifyMedia(item.media_id, inputs, token);
      console.log("PUT media: ", response);
      setError("");
      setMessage("Update successful!");
    } catch (error) {
      console.log("File post error: ", error);
      setMessage("");
      setError(error.message);
    }
  };

  const { handleInputChange, handleSubmit, inputs } = useForm(
    doUpdate,
    initValues
  );

  return (
    <dialog
      open
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-orange-50 p-6 rounded-lg shadow-xl w-1/3">
        <button
          onClick={onClose}
          className="bg-amber-600 text-amber-50 font-bold px-3 py-1 rounded hover:bg-amber-800"
        >
          X
        </button>

        <h2 className="text-xl font-bold my-4 text-indigo-900">EDIT MEDIA</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-orange-50 w-11/12 m-auto p-8 text-neutral-900 rounded-sm"
        >
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>Could not upload: {error}</p>}
          <div>
            <label htmlFor="title" className="block w-full text-left">
              Title:{" "}
            </label>
            <input
              name="title"
              type="text"
              id="title"
              onChange={handleInputChange}
              value={inputs.title}
              placeholder="Type title"
              className="p-1.5 bg-neutral-50 border-2 border-amber-950 mt-3.5 mb-3.5 text-neutral-900 w-full"
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
              value={inputs.description}
              placeholder="Type description"
              className="p-1.5 bg-neutral-50 border-2 border-amber-950 mt-1.5 mb-3.5 text-neutral-900 w-full"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={
              inputs.description.length > 3 || inputs.title.length > 3
                ? false
                : true
            }
            className="bg-indigo-600 hover:bg-indigo-800 p-2.5 mt-5 font-extrabold rounded-md text-amber-50 disabled:bg-amber-900"
          >
            Update
          </button>
        </form>

        {/* TODO: Form for title and description */}
      </div>
    </dialog>
  );
};

export default EditDialog;
