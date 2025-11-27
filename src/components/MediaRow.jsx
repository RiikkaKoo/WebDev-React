import PropTypes from "prop-types";
import { Link } from "react-router";
import { useUserContext } from "../hooks/contextHooks";
import { useState } from "react";
import EditDialog from "./EditDialog";

const MediaRow = (props) => {
  const { user } = useUserContext();
  const { item, deleteMedia, modifyMedia } = props;
  const token = localStorage.getItem("token");

  const [showEditDialog, setShowEditDialog] = useState(false);

  console.log(user.user_id);
  console.log(item.media_id);

  const isLoggedIn = !!user; //Boolean(user)
  const isOwner = isLoggedIn && user.user_id === item.user_id;
  const isAdmin = user.role === "admin";
  const canEdit = isOwner || isAdmin;

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
    <tr key={item.media_id}>
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
        <Link to="/single" state={item} className="show-btn">
          Show
        </Link>
        {canEdit && (
          <>
            <button
              onClick={handleModify}
              className="bg-indigo-600 font-semibold p-2.5 m-1.5 hover:bg-indigo-900 w-full rounded-md"
            >
              Modify
            </button>
            <button
              onClick={handleDelete}
              className="bg-amber-600 font-semibold p-2.5 m-1.5 hover:bg-amber-800 w-full rounded-md"
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
