import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({user, rest}) => {
  return (
    <>
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((quality) => (
            <Quality
              key={quality._id}
              color={quality.color}
              name={quality.name}
              id={quality._id}
            />
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} /5</td>
        <td>
          <button
            className="btn btn-outline-secondary"
            onClick={() => rest.onToggle(user._id)}
          >
            <Bookmark status={user.bookmark} />
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-secondary bg-danger btn-sm m-2"
            onClick={() => rest.onDelete(user._id)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
