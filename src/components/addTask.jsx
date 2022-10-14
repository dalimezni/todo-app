import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { addTask } from "../services/api";

export default function AddTask({ onAddTask }) {
  const [task, setTask] = React.useState("");
  const [deadline, setDeadline] = React.useState();
  const [showDeadline, setShowdeadline] = React.useState(false);
  const [openSucces, setopenSucces] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleDeadline = (newValue) => {
    setDeadline(newValue);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setopenSucces(false);
  };

  function Add() {
    if (task.length <= 10) {
      setOpenError(true);
    } else {
      addTask(task, deadline)
        .then((res) => res.json())
        .then((data) => {
          onAddTask(data);
          setopenSucces(true);
          setTask("");
        });
    }
  }

  return (
    <div>
      <Snackbar
        open={openError}
        autoHideDuration={2500}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          Task name must be entered and at least 10 charecters
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSucces}
        autoHideDuration={2500}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Task Added
        </Alert>
      </Snackbar>

      <TextField
        id="outlined-basic"
        label="Add a task"
        onChange={(newValue) => setTask(newValue.target.value)}
        variant="outlined"
        value={task}
      />
      <br />
      <FormControlLabel
        control={
          <Checkbox
            onChange={() => {
              setShowdeadline(!showDeadline);
              setDeadline(deadline ? undefined : dayjs());
            }}
          />
        }
        label="Add a deadline"
      />
      <br />

      {showDeadline ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Add a Deadline"
            value={deadline}
            inputFormat="MM/DD/YYYY"
            onChange={handleDeadline}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      ) : (
        <></>
      )}

      <br />
      <Button disabled={task.length === 0} onClick={Add} variant="text">
        Add a task{" "}
      </Button>
    </div>
  );
}
