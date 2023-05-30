import React from "react";
import classes from './MySelect.module.css'

const MySelect = ({ value, defaulValue, options, onChange }) => {
  return (
    <div>
      <select className={classes.mySelect} value={value} onChange={event => onChange(event.target.value)}>
        <option key={options.value} disabled={true} value="">
          {defaulValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;
