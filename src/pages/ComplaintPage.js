import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Skeleton,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import request from "src/utils/request";
import { api } from "src/constants";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'complaintUuid', label: 'Complaint UUID', alignRight: false },
  { id: "complaintBy", label: "Complaint By", alignRight: false },
  { id: "complaintAgainst", label: "Complaint Against", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "file", label: "Attachment", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "notes", label: "Notes", alignRight: false },
  { id: "createdAt", label: "CreatedAt", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ComplaintPage() {
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [complaints, setComplaints] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({
    state: "loading",
    message: "Complaints are loading...",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState("");
  const [notes, setNotes] = useState("");
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleDialogOpen = (action) => {
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNotes("");
  };

  const handleConfirmDialog = async () => {
    try {
      if (dialogAction === "Resolve") {
        await handleResolve(selectedId, notes);
      } else if (dialogAction === "Reject") {
        await handleReject(selectedId, notes);
      }
      handleDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    setLoadingStatus({
      state: "loading",
      message: "Complaints are loading...",
    });
    setComplaints([]);
    try {
      const response = await request.post(api.complaints, {
        userId: user._id,
      });

      setComplaints(response?.data?.data);
      setLoadingStatus({
        state: "success",
        message: "Complaints loaded successfully!",
      });
    } catch (error) {
      // Handle error
      if (error?.response) {
        setLoadingStatus({
          state: "error",
          message: error.response.data.message,
        });
      } else {
        setLoadingStatus({
          state: "error",
          message: "Something went wrong!",
        });
      }
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchData();
    }
  }, [user]);

  const handleReject = async (complaintId, notes) => {
    console.log(`Rejecting complaint with ID: ${complaintId}`);
    try {
      const response = await request.post(api.changeComplaintStatus, {
        userId: user._id,
        complaintId: complaintId,
        status: "Rejected",
        notes: notes,
      });
      toast.success(response?.data?.message || "Complaint status updated");
      setOpen(null);
      // Get latest data
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleResolve = async (complaintId, notes) => {
    console.log(`Resolving complaint with ID: ${complaintId}`);
    try {
      const response = await request.post(api.changeComplaintStatus, {
        userId: user._id,
        complaintId: complaintId,
        status: "Resolved",
        notes: notes,
      });
      toast.success(response?.data?.message || "Complaint status updated");
      setOpen(null);
      // Get latest data
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setSelectedId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - complaints.length) : 0;

  const filteredComplaints = applySortFilter(
    complaints,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredComplaints.length && !!filterName;
  const isConfirmDisabled = notes.length < 3; // Disable Confirm button if notes are too short

  return (
    <>
      <Helmet>
        <title> Complaints | Mawa </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Complaints ({complaints.length})
          </Typography>
          {/* <Button
            variant='contained'
            startIcon={<Iconify icon='eva:plus-fill' />}
          >
            New User
          </Button> */}
        </Stack>

        <Card>
          {/* <UserListToolbar
            // numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {loadingStatus.state === "loading" ? (
                <Table>
                  <TableBody>
                    {/* Replace this with your table rows */}
                    {Array.from({ length: rowsPerPage }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton variant="text" animation="wave" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    // rowCount={USERLIST.length}
                    // numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    // onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredComplaints
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          _id,
                          complaintUUID,
                          complaintBy,
                          complaintAgainst,
                          complaintFile,
                          status,
                          description,
                          notes,
                          createdAt,
                        } = row;
                        const selectedUser =
                          selected.indexOf(complaintUUID) !== -1;

                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedUser}
                          >
                            {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell> */}

                            {/* <TableCell align='left'>{_id}</TableCell> */}

                            <TableCell
                              component="th"
                              scope="row"
                              padding="normal"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <Avatar
                                  alt={complaintBy?.fullName}
                                  src={
                                    complaintBy?.profilePic ||
                                    "/assets/images/avatars/avatar_default.jpg"
                                  }
                                  onClick={() => {
                                    setSelectedImage(
                                      complaintBy?.profilePic ||
                                        "/assets/images/avatars/avatar_default.jpg"
                                    );
                                    setImageDialogOpen(true);
                                  }}
                                  style={{
                                    cursor: "pointer",
                                    border: "1px solid #d1d1d1",
                                  }}
                                />
                                <Stack direction="column">
                                  <Typography variant="subtitle2" noWrap>
                                    {complaintBy?.fullName}
                                  </Typography>
                                  <Typography variant="subtitle3" noWrap>
                                    ({complaintBy?.userType})
                                  </Typography>
                                </Stack>
                              </Stack>
                            </TableCell>

                            <TableCell
                              component="th"
                              scope="row"
                              padding="normal"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <Avatar
                                  alt={complaintAgainst?.fullName}
                                  src={
                                    complaintAgainst?.profilePic ||
                                    "/assets/images/avatars/avatar_default.jpg"
                                  }
                                  onClick={() => {
                                    setSelectedImage(
                                      complaintAgainst?.profilePic ||
                                        "/assets/images/avatars/avatar_default.jpg"
                                    );
                                    setImageDialogOpen(true);
                                  }}
                                  style={{
                                    cursor: "pointer",
                                    border: "1px solid #d1d1d1",
                                  }}
                                />
                                <Stack direction="column">
                                  <Typography variant="subtitle2" noWrap>
                                    {complaintAgainst?.fullName}
                                  </Typography>
                                  <Typography variant="subtitle3" noWrap>
                                    ({complaintAgainst?.userType})
                                  </Typography>
                                </Stack>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{description}</TableCell>

                            <TableCell
                              component="th"
                              scope="row"
                              padding="normal"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <Avatar
                                  alt={complaintAgainst?.fullName}
                                  src={
                                    complaintFile ||
                                    "/assets/images/avatars/avatar_default.jpg"
                                  }
                                  onClick={() => {
                                    setSelectedImage(
                                      complaintFile ||
                                        "/assets/images/avatars/avatar_default.jpg"
                                    );
                                    setImageDialogOpen(true);
                                  }}
                                  style={{
                                    cursor: "pointer",
                                    border: "1px solid #d1d1d1",
                                  }}
                                />
                              </Stack>
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                // color={
                                //   (status === 'Pending' && 'error') || 'success'
                                // }
                                color={
                                  status === "Pending"
                                    ? "info"
                                    : status === "Resolved"
                                    ? "success"
                                    : "error"
                                }
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>

                            <TableCell align="left">
                              {notes ? notes : "No notes"}
                            </TableCell>

                            <TableCell align="left">
                              {moment(createdAt).format("DD-MM-YY hh:mm A")}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                size="large"
                                color="inherit"
                                disabled={status !== "Pending"}
                                onClick={(event) => handleOpenMenu(event, _id)}
                                // onClick={handleOpenMenu}
                              >
                                <Iconify icon={"eva:more-vertical-fill"} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {loadingStatus.state !== "success" && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              {loadingStatus.message}
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              )}
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={complaints.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 160,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Change Status
        </MenuItem> */}

        <MenuItem
          sx={{ color: "success.main" }}
          onClick={() => handleDialogOpen("Resolve")}
          // onClick={() => handleResolve(selectedId)}
        >
          <Iconify icon={"teenyicons:file-tick-outline"} sx={{ mr: 1 }} />
          Resolve
        </MenuItem>

        <Divider />

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => handleDialogOpen("Reject")}
          // onClick={() => handleReject(selectedId)}
        >
          <Iconify icon={"ri:file-excel-line"} sx={{ mr: 1 }} />
          Reject
        </MenuItem>
      </Popover>

      {/* Dialog for Resolve or Reject */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogAction === "Resolve" ? "Resolve" : "Reject"} Complaint
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {dialogAction.toLowerCase()} this
            complaint?
          </DialogContentText>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDialog}
            variant="outlined"
            color="primary"
            disabled={isConfirmDisabled}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for open image */}
      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="md"
      >
        <DialogContent>
          <img
            src={selectedImage}
            alt="Full Size"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
