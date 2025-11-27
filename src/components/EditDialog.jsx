const EditDialog = ({ item, modifyMedia, onClose }) => {
  return (
    <dialog open>
      <button
        onClick={onClose}
        className="bg-indigo-600 text-amber-50 font-bold p-1.5"
      >
        X
      </button>
      <h1>EDIT MEDIA DIALOG</h1>
      TODO: From for title and desc
    </dialog>
  );
};

export default EditDialog;
