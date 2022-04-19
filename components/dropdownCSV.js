import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import CSVReader from './CSVReader';

function DropdownCSV() {
  const [itemSelect, setItemSelect] = React.useState('');
  const [array, setArray] = React.useState([]);
  const [nameField, setNameField] = React.useState('');
  const [element, setElement] = React.useState('');
  const [notif, setNotif] = React.useState('');
  const [showAlertEmpty, setShowAlertEmpty] = React.useState(false);

  const handleChangeItemSelect = (event) => {
    setItemSelect(event.target.value);
  };

  const handleChangeNameField = (event) => {
    setNameField(event.target.value);
  };

  const handleArray = (arrayData) => {
    arrayData.forEach((elt) =>
      setArray((prev) => {
        const newArray = [...prev];
        newArray.push(elt);
        return newArray;
      })
    );
  };

  const onSubmitAjoutElement = (event) => {
    event.preventDefault();
    if (element.trim().length === 0) {
      setNotif('Vous devez entrer un élément');
      setShowAlertEmpty(true);
    } else {
      setArray((prev) => {
        const newArray = [...prev];
        newArray.push(element);
        return newArray;
      });
    }
    setElement('');
  };

  const handleTFAjoutElement = (event) => {
    setElement(event.target.value);
  };

  const displayDropDown = () => {
    if (array.length === 0) {
      return <></>;
    } else {
      return (
        <>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{nameField}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={itemSelect}
                label="select-csv"
                onChange={handleChangeItemSelect}
              >
                {array.map((itemCSV) => (
                  <MenuItem value={itemCSV}>{itemCSV}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      );
    }
  };

  return (
    <div>
      <Collapse in={showAlertEmpty}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlertEmpty(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {notif}
        </Alert>
      </Collapse>

      <CSVReader dataCSV={handleArray} />
      <br />

      <TextField
        style={{ marginBottom: '10px', width: '100%' }}
        id="outlined-basic"
        label="Choisir le nom du dropdown"
        variant="outlined"
        onChange={handleChangeNameField}
      />

      <form onSubmit={onSubmitAjoutElement}>
        <TextField
          style={{ marginBottom: '10px', width: '100%' }}
          id="outlined-basic"
          label="Ajouter un élément au dropdown"
          variant="outlined"
          value={element}
          onChange={handleTFAjoutElement}
        />
      </form>

      {displayDropDown()}
    </div>
  );
}

export default DropdownCSV;
