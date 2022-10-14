import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Button, Chip, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { deleteTask, markAsDone } from "../services/api";
import dayjs from "dayjs";

export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  const [openSucces, setopenSucces] = React.useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenSucces(false);
  };

  function handleDeleteTask(id) {
    deleteTask(id).then((res) => {
      onDeleteTask(id);
      setopenSucces(true);
    });
  }
  function handleDoneTask(task) {
    markAsDone(task)
      .then((res) => res.json())
      .then((data) => {
        onChangeTask(data);
      });
  }

  function checkDeadline(deadline) {
    if (deadline) {
      if (dayjs().isAfter(dayjs(deadline))) {
        return true;
      }
    }
  }
  return (
    <div>
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
          Task Deleted
        </Alert>
      </Snackbar>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 &&
              tasks.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell componenidt="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>
                    {row.deadline ? (
                      dayjs(row.deadline).format("DD/MM/YYYY")
                    ) : (
                      <Chip label="No deadline set" color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    {row.done ? (
                      <Chip label="Done" color="success" />
                    ) : (
                      <Chip label="In progress" color="warning" />
                    )}
                    &nbsp;
                    {!row.done && checkDeadline(row.deadline) && (
                      <Chip label="Overdue" color="error" />
                    )}
                  </TableCell>

                  <TableCell id="buttonstable">
                    <Button
                      onClick={() => handleDeleteTask(row.id)}
                      variant="contained"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>

                    <Button
                      disabled={row.done}
                      onClick={() => handleDoneTask(row)}
                      variant="contained"
                      startIcon={<DoneIcon />}
                    >
                      {row.done ? "Done" : "Mark As Done"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
