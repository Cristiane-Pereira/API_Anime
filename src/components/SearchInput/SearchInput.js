import React, { Fragment, useState } from "react";
import { useDebounce } from "../useDebounce/useDebounce";

export const SearchInput = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState(value); //vem de fora, é oq vai controlar e diminuir o número de renderização em cada vez que o usuario digita algo no input.
  const debouncedChange = useDebounce(onChange, 500);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }
  return (
    <Fragment>
      <input
        type="search"
        onChange={handleChange}
        value={displayValue}
        style={{
          width: "300px",
          height: "40px",
        }}
      />
    </Fragment>
  );
};
