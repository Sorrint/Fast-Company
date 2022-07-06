import React, {useState} from "react";
import api from "../api";
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((users) => users._id !== userId));
  };
  const renderPhrase = (number) => {
    if (number >= 11 && number <= 20) {
      return `${number} человек тусанет с тобой сегодня`;
    } else {
      const lastDigit = number.toString().split("").pop();
      switch (lastDigit) {
        case "1":
          return `${number} человек тусанет с тобой сегодня`;
        case "2":
        case "3":
        case "4":
          return `${number} человека тусанут с тобой сегодня`;
        default:
          return `${number} человек тусанут с тобой сегодня`;
      }
    }
  };
  return (
    <>
      <h2>
        {users.length === 0 ? (
          <span className="badge bg-danger">Никто с тобой не тусанет</span>
        ) : (
          <span className="badge bg-primary">{renderPhrase(users.length)}</span>
        )}
      </h2>
      {users.length !== 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((person) => (
              <tr key={person._id}>
                <td>{person.name}</td>
                <td>
                  {person.qualities.map((quality) => (
                    <span
                      key={quality._id}
                      className={`badge bg-${quality.color} m-1`}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{person.profession.name}</td>
                <td>{person.completedMeetings}</td>
                <td>{person.rate} /5</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary bg-danger btn-sm m-2"
                    onClick={() => handleDelete(person._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
};

export default Users;
