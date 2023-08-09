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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'complaintUuid', label: 'Complaint UUID', alignRight: false },
  { id: "complaintBy", label: "Complaint By", alignRight: false },
  { id: "complaintAgainst", label: "Complaint Against", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
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
  const [loadingStatus, setLoadingStatus] = useState({
    state: "loading",
    message: "Complaints are loading...",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.post(api.complaints, {
          userId: user._id,
        });
        console.log(response);
        console.log(response?.data?.data.length);
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

    if (user?._id) {
      fetchData();
    }
  }, [user]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        complaintUUID,
                        complaintBy,
                        complaintAgainst,
                        complaintFile,
                        status,
                        description,
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
                              />
                              <Stack direction="column">
                                <Typography variant="subtitle2" noWrap>
                                  {complaintBy?.fullName}
                                </Typography>
                                <Typography variant="subtitle3" noWrap>
                                  (Employer)
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
                              />
                              <Stack direction="column">
                                <Typography variant="subtitle2" noWrap>
                                  {complaintAgainst?.fullName}
                                </Typography>
                                <Typography variant="subtitle3" noWrap>
                                  (Worker)
                                </Typography>
                              </Stack>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{description}</TableCell>

                          <TableCell align="left">
                            <Label
                              color={
                                (status === "Pending" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            {moment(createdAt).format("YYYY-MM-DD hh:mm A")}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              disabled={status !== "Pending"}
                              onClick={handleOpenMenu}
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

        <MenuItem sx={{ color: "success.main" }}>
          <Iconify icon={"teenyicons:file-tick-outline"} sx={{ mr: 1 }} />
          Resolve
        </MenuItem>

        <Divider />

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"ri:file-excel-line"} sx={{ mr: 1 }} />
          Reject
        </MenuItem>
      </Popover>
    </>
  );
}
