import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';

function valuetext(value) {
  return `${value} SR`;
}

export default function RangeSlider(prop) {
  const [value, setValue] = useState([0, 5000]);
  const [tempValue, setTempValue] = useState([0, 5000]);

  const handleChange = (event, newValue) => {
    setTempValue(newValue);
  };

  const handleChangeCommitted = () => {
    setValue(tempValue);
  };

  useEffect(() => {
    prop.setValue(value);
  }, [value]);

  return (
    <Box sx={{ width: 500 }}>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={tempValue}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        min={0}
        max={5000}
      />
    </Box>
  );
}

