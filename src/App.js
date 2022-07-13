import React, {useState} from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((users) => users._id !== userId));
  };
  const handleToggleBookmark = (id) => {
    const updatedUsers = users.map((user) => {
      if (user._id === id) {
        return {...user, status: !user.status};
      }
      return user;
    });
    setUsers(updatedUsers);
    // setUsers((prevState) =>
    //   prevState.map((users) => {
    //     if (users._id === id) {
    //       return {...users, status: !users.status};
    //     }
    //     return users;
    //   })
    // );
    // console.log(us)
  };

  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggle={handleToggleBookmark}
      />
    </div>
  );
}

export default App;