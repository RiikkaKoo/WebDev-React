import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/contextHooks";
import { useState } from "react";
import EditDialog from "./EditDialog";

const MediaRow = (props) => {
  const { user } = useUserContext();
  const { item, deleteMedia, modifyMedia } = props;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [showEditDialog, setShowEditDialog] = useState(false);

  //console.log(user.user_id);
  //console.log(item.media_id);

  let isOwner = "";
  let isAdmin = "";
  let canEdit = "";

  const isLoggedIn = !!user; //Boolean(user)
  if (isLoggedIn) {
    isOwner = isLoggedIn && user.user_id === item.user_id;
    isAdmin = user.role === "admin";
    canEdit = isOwner || isAdmin;
  }

  const handleModify = () => {
    console.log("Handle modify");
    setShowEditDialog(true);
  };

  const handleDelete = async () => {
    console.log("Handle delete");
    if (confirm("Sure you want to delete this item?")) {
      const deleteResponse = await deleteMedia(item.media_id, token);
      console.log(deleteResponse);
      window.location.reload();
    }
  };

  return (
    <tr key={item.media_id} className="*:p-3.5 *:border border-amber-800">
      <td>
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{ maxWidth: "90%", borderRadius: "5px" }}
        />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString("fi-FI")}</td>
      <td>
        {item.username}
        <br />
        ID: {item.user_id}
      </td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button
          className="bg-yellow-500 font-semibold p-2.5 m-1.5 hover:bg-yellow-700 w-10/12 rounded-md"
          onClick={() => navigate("/single", { state: item })}
        >
          Show
        </button>
        {canEdit && (
          <>
            <button
              onClick={handleModify}
              className="bg-indigo-600 font-semibold p-2.5 m-1.5 hover:bg-indigo-900 w-10/12 rounded-md"
            >
              Modify
            </button>
            <button
              onClick={handleDelete}
              className="bg-amber-600 font-semibold p-2.5 m-1.5 hover:bg-amber-800 w-10/12 rounded-md"
            >
              Delete
            </button>
            {showEditDialog && (
              <EditDialog
                item={item}
                modifyMedia={modifyMedia}
                onClose={() => setShowEditDialog(false)}
              />
            )}
          </>
        )}
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  name: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
