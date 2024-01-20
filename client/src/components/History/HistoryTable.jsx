import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { visuallyHidden } from "@mui/utils";
import { Typography, styled } from "@mui/material";
import HistoryTableAction from "./HistoryTableAction";

const InputType = {
    EXPRESSION: "expression",
    CODE: "code",
};

const InputLang = {
    PYTHON: "python",
    JAVA: "java",
};

const OutputLang = {
    C: "c",
    ARM: "arm",
};

function createData(id, inputType, inputLang, outputLang, dateTime) {
    return {
        id,
        inputType,
        inputLang,
        outputLang,
        dateTime,
    };
}

const rows = [
    createData(
        1,
        InputType.EXPRESSION,
        null,
        OutputLang.ARM,
        "2022-10-01T05:04:26Z"
    ),
    createData(
        2,
        InputType.CODE,
        InputLang.JAVA,
        OutputLang.C,
        "2023-12-05T07:45;24Z"
    ),
];

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: "id",
        numeric: true,
        disablePadding: false,
        label: "ID",
    },
    {
        id: "inputType",
        numeric: true,
        disablePadding: false,
        label: "Input Type",
    },
    {
        id: "inputLang",
        numeric: true,
        disablePadding: false,
        label: "Input Language",
    },
    {
        id: "outputLang",
        numeric: true,
        disablePadding: false,
        label: "Output Language",
    },
    {
        id: "datetime",
        numeric: true,
        disablePadding: false,
        label: "DateTime",
    },
    {
        id: "action",
        numeric: true,
        disablePadding: false,
        label: "Action",
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                            sx={{
                                "& .MuiTableSortLabel-icon": {
                                    color: "var(--color-accent) !important",
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "var(--color-accent)",
                                    fontFamily: "Roboto",
                                    fontWeight: 600,
                                }}
                            >
                                {headCell.label}
                            </Typography>
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#194f58",
    },
    "&:nth-of-type(even)": {
        backgroundColor: "var(--color-primary)",
    },
}));

export default function EnhancedTable() {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Paper
                sx={{
                    width: "100%",
                    mb: 2,
                    bgcolor: "var(--color-primary)",
                    padding: "1rem",
                    boxShadow: "0",
                }}
            >
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <StyledTableRow
                                        hover
                                        onClick={(event) =>
                                            handleClick(event, row.id)
                                        }
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        <TableCell
                                            align="right"
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{
                                                color: "var(--color-accent)",
                                            }}
                                        >
                                            {row.id}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: "var(--color-accent)",
                                            }}
                                        >
                                            {row.inputType}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: "var(--color-accent)",
                                            }}
                                        >
                                            {row.inputLang}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: "var(--color-accent)",
                                            }}
                                        >
                                            {row.outputLang}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: "var(--color-accent)",
                                            }}
                                        >
                                            {row.dateTime}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: "var(--color-accent)",
                                            }}
                                        >
                                            <HistoryTableAction />
                                        </TableCell>
                                    </StyledTableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={{ color: "var(--color-accent)" }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
