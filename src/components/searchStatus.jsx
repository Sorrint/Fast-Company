import React from "react";

const SearchStatus = ({length}) => {
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
        {length === 0 ? (
          <span className="badge bg-danger">Никто с тобой не тусанет</span>
        ) : (
          <span className="badge bg-primary">{renderPhrase(length)}</span>
        )}
      </h2>
    </>
  );
};

export default SearchStatus;
