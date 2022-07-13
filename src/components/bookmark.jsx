import React from "react";

const Bookmark = ({status, ...rest}) => {
  const renderIcon = (status) => {
    return status ? "bi bi-bookmark-fill" : "bi bi-bookmark sm";
  };

  return (
    <>
      <i className={renderIcon(status)}></i>
    </>
  );
};

export default Bookmark;
