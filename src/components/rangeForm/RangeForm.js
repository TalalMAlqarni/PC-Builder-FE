import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';

function valuetext(value) {
  return `${value} $`;
}

export default function RangeSlider(prop) {
  const [value, setValue] = useState([0, 3000]);
  const [tempValue, setTempValue] = useState([0, 3000]);

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
    <Box sx={{ width: '100%', maxWidth: '500px', mt: 2 }}>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={tempValue}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        min={0}
        max={3000}
        sx={{
          color: '#f49521',
          '& .MuiSlider-thumb': {
            backgroundColor: '#1A204f',
            border: '2px solid #fff',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#e0e0e0',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#f49521',
          },
        }}
      />
    </Box>
  );
}

