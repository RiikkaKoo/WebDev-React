import PropTypes from "prop-types";
import { Link } from "react-router";

const MediaRow = ({ item }) => {
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
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  name: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
