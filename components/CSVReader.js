import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

function CSVReader(props) {
  const [file, setFile] = useState();
  const [notif, setNotif] = useState('');
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSucceed, setShowAlertSucceed] = useState(false);
  const [delimitateur, setDelimitateur] = useState('');
  const [isFileChoose, setIsFileChoose] = useState(false);
  const [isDelimitateurChoose, setIsDelimitateurChoose] = useState(false);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    setIsFileChoose(true);
  };

  const csvFileToArray = (string) => {
    //Check if the delimiter is correct
    if (!string.includes(delimitateur)) {
      setNotif("Le délimitateur choisi n'est pas correct.");
      setShowAlertError(true);
    } else {
      const splitString = string.split(delimitateur);

      const splitStringTreated = [];
      var i = 0;
      while (i < splitString.length) {
        if (splitString[i].trim().length !== 0) {
          //Check if the element is only composed of white space
          splitStringTreated.push(splitString[i]);
        }
        i++;
      }

      if (splitStringTreated.length === 0) {
        setNotif('Le fichier est vide.');
        setShowAlertError(true);
      } else {
        splitStringTreated.sort();
        props.dataCSV(splitStringTreated);
        setNotif('Le fichier a bien été pris en compte.');
        setShowAlertSucceed(true);
      }
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (isFileChoose === false) {
      setNotif('Vous devez choisir un fichier.');
      setShowAlertError(true);
    }

    if (isDelimitateurChoose === false) {
      setNotif('Vous devez choisir un délimitateur.');
      setShowAlertError(true);
    }

    if (file && isDelimitateurChoose) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const handleChangeDelimitateur = (event) => {
    setDelimitateur(event.target.value);
    setIsDelimitateurChoose(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Collapse in={showAlertError}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlertError(false);
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

      <Collapse in={showAlertSucceed}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlertSucceed(false);
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

      <Box sx={{ minWidth: 120, marginBottom: '30px' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Choix du délimitateur
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={delimitateur}
            label="choix-delimitateur"
            onChange={handleChangeDelimitateur}
          >
            <MenuItem value={';'}>;</MenuItem>
            <MenuItem value={','}>,</MenuItem>
            <MenuItem value={'.'}>.</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <form>
        <input
          style={{ marginRight: '2%' }}
          accept={'.csv'}
          id={'csvFileInput'}
          type={'file'}
          onChange={handleOnChange}
        />

        <Button
          variant="contained"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
          disableElevation
        >
          Choisir ce CSV
        </Button>
      </form>
    </div>
  );
}

export default CSVReader;
