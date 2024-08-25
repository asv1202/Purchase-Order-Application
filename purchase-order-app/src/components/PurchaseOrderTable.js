import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, TablePagination, TableFooter, TableSortLabel, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const formatNumber = (number) => {
  return number ? number.toLocaleString() : 'N/A';
};


const PurchaseOrderTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(data.map(row => row.id));
      setSelectAll(true);
    } else {
      setSelected([]);
      setSelectAll(false);
    }
  };

  const handleRowSelect = (id) => {
    setSelected(prevSelected => {
      const isSelected = prevSelected.includes(id);
      if (isSelected) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const sortedData = React.useMemo(() => {
    const stabilizedData = data.map((el, index) => [el, index]);
    stabilizedData.sort((a, b) => {
      const orderMultiplier = order === 'asc' ? 1 : -1;
      if (a[0][orderBy] < b[0][orderBy]) {
        return -1 * orderMultiplier;
      }
      if (a[0][orderBy] > b[0][orderBy]) {
        return 1 * orderMultiplier;
      }
      return a[1] - b[1];
    });
    return stabilizedData.map((el) => el[0]);
  }, [data, order, orderBy]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Rejected':
        return 'red';
      case 'Review Requested':
        return '#ffbd33 ';
      default:
        return '#007bff';
    }
  };

  return (
    <Paper sx={{ border: '1px solid #d3d3d3', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
      <TableContainer style={{ overflowX: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sortDirection={orderBy === 'vendor' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'vendor'}
                  direction={orderBy === 'vendor' ? order : 'asc'}
                  onClick={() => handleRequestSort('vendor')}
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                >
                  Vendor
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'vendorCode' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'vendorCode'}
                  direction={orderBy === 'vendorCode' ? order : 'asc'}
                  onClick={() => handleRequestSort('vendorCode')}
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                >
                  Vendor Code
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>PO#</TableCell>
              <TableCell sortDirection={orderBy === 'poLine' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'poLine'}
                  direction={orderBy === 'poLine' ? order : 'asc'}
                  onClick={() => handleRequestSort('poLine')}
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                >
                  PO Line
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>Description</TableCell>
              <TableCell sortDirection={orderBy === 'poValue' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'poValue'}
                  direction={orderBy === 'poValue' ? order : 'asc'}
                  onClick={() => handleRequestSort('poValue')}
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                >
                  PO Value - INR
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'qtyOrdered' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'qtyOrdered'}
                  direction={orderBy === 'qtyOrdered' ? order : 'asc'}
                  onClick={() => handleRequestSort('qtyOrdered')}
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                >
                  Qty Ordered
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'qtyShipped' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'qtyShipped'}
                  direction={orderBy === 'qtyShipped' ? order : 'asc'}
                  onClick={() => handleRequestSort('qtyShipped')}
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                >
                  Qty Shipped
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'grQuantity' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'grQuantity'}
                  direction={orderBy === 'grQuantity' ? order : 'asc'}
                  onClick={() => handleRequestSort('grQuantity')}
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                >
                  GR Quantity
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>UOM</TableCell>
              <TableCell sortDirection={orderBy === 'dueDate' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'dueDate'}
                  direction={orderBy === 'dueDate' ? order : 'asc'}
                  onClick={() => handleRequestSort('dueDate')}
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                >
                  Due Date
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'committedDate' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'committedDate'}
                  direction={orderBy === 'committedDate' ? order : 'asc'}
                  onClick={() => handleRequestSort('committedDate')}
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                >
                  Committed Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem' }}>
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'left' }}>{row.vendor || 'N/A'}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'center' }}>{row.vendorCode || 'N/A'}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'center' }}>{row.poNumber || 'N/A'}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'center' }}>{row.poLine || 'N/A'}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem' }}>{row.description || 'N/A'}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'center' }}>{formatNumber(row.poValue)}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'center' }}>{formatNumber(row.qtyOrdered)}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'center' }}>{formatNumber(row.qtyShipped)}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'center' }}>{formatNumber(row.grQuantity)}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'center' }}>{row.uom || 'N/A'}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'center' }}>{row.dueDate || 'N/A'}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', fontSize: '0.75rem', justifyContent: 'center' }}>{row.committedDate || 'N/A'}</TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'normal',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: getStatusColor(row.status),
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.75rem' }}>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete"></Tooltip>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiTablePagination-menuItem': {
                    color: 'black',
                  },
                  '.MuiTablePagination-actions': {
                    color: 'black',
                  },
                }}
                fontWeight="bold"
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PurchaseOrderTable;
