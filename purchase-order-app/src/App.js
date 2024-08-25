import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PurchaseOrderTable from './components/PurchaseOrderTable';
import StatusFilter from './components/StatusFilter';
import DateFilter from './components/DateFilter';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import { Container, Grid, Box, Typography, IconButton, Divider, Tooltip } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import POActions from './components/POActions';

const dummyData = [
  { id: 1, vendor: 'Allen Packs', vendorCode: '321345', poNumber: '4504567863', poLine: 1, description: 'Carton - Azithro 3x10 300 GSM FBB', poValue: 350000, qtyOrdered: 300000, qtyShipped: 300000, grQuantity: 300000, uom: 'EA', dueDate: '15/03/2020', committedDate: '15/03/2020', status: 'GRN Posted' },
  { id: 2, vendor: 'Ghatotkach Packs', vendorCode: '334578', poNumber: '4504354567', poLine: 1, description: 'Corr Box 5 ply - 12.2 x 12.2 x 6.2', poValue: 900000, qtyOrdered: 50000, qtyShipped: 50000, grQuantity: 50000, uom: 'EA', dueDate: '21/03/2020', committedDate: '21/03/2020', status: 'GRN Posted' },
  { id: 3, vendor: 'Essel Propack', vendorCode: '357898', poNumber: '4504678765', poLine: 1, description: 'Label - Esiflo Trans 250', poValue: 450000, qtyOrdered: 450000, qtyShipped: null, grQuantity: null, uom: 'EA', dueDate: '13/04/2020', committedDate: '13/04/2020', status: 'Accepted' },
  { id: 4, vendor: 'Essel Propack', vendorCode: '357898', poNumber: '4504678765', poLine: 2, description: 'Label - Esiflo Trans 500', poValue: 270000, qtyOrdered: 300000, qtyShipped: null, grQuantity: null, uom: 'EA', dueDate: '13/04/2020', committedDate: '13/04/2020', status: 'Review Requested' },
  { id: 5, vendor: 'Scorpion Packaging', vendorCode: '343454', poNumber: '4504675643', poLine: 1, description: 'Carton CEFPODOXIME 100 DS', poValue: 298960, qtyOrdered: 350000, qtyShipped: null, grQuantity: null, uom: 'EA', dueDate: '14/04/2020', committedDate: '14/04/2020', status: 'Accepted' },
  { id: 6, vendor: 'APRO films', vendorCode: '323154', poNumber: '4504897654', poLine: 1, description: 'PVC-PVDC 30 microns', poValue: 4800000, qtyOrdered: 2000, qtyShipped: null, grQuantity: null, uom: 'KG', dueDate: '17/04/2020', committedDate: '17/04/2020', status: 'Delayed' },
  { id: 7, vendor: 'Paperworkz', vendorCode: '322322', poNumber: '4504324567', poLine: 1, description: 'Corr Box 7 ply - 12.2 x 12.2 x 6.2', poValue: 1250000, qtyOrdered: 50000, qtyShipped: null, grQuantity: null, uom: 'EA', dueDate: '18/04/2020', committedDate: null, status: 'Rejected' },
  { id: 8, vendor: 'Intut films Ltd', vendorCode: '311456', poNumber: '4504987890', poLine: 1, description: 'PVC-PVDC 35 microns', poValue: 430000, qtyOrdered: 2000, qtyShipped: null, grQuantity: null, uom: 'KG', dueDate: '21/04/2020', committedDate: '21/04/2020', status: 'Delayed' },
  { id: 9, vendor: 'Johnson PET', vendorCode: '378432', poNumber: '4504324578', poLine: 1, description: 'PET Bottles 60 ML Amber', poValue: 770000, qtyOrdered: 350000, qtyShipped: null, grQuantity: null, uom: 'EA', dueDate: '19/04/2020', committedDate: null, status: 'Response Awaited' },
  { id: 10, vendor: 'XMR packaging', vendorCode: '311654', poNumber: '4504905787', poLine: 1, description: 'PET Bottles 100 ML', poValue: 600000, qtyOrdered: 300000, qtyShipped: null, grQuantity: null, uom: 'EA', dueDate: '30/04/2020', committedDate: null, status: 'Response Awaited' },
  { id: 11, vendor: 'Temple Packaging', vendorCode: '322678', poNumber: '4504905899', poLine: 1, description: 'Carton CEFAXONE 1000 MG 320 GSM WB', poValue: 90000, qtyOrdered: 200000, qtyShipped: null, grQuantity: null, uom: 'EA', dueDate: '30/04/2020', committedDate: null, status: 'Response Awaited' }
];


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState('');
  const [filters, setFilters] = useState({ poAction: '', vendor: 'All', status: 'All', fromDate: '', toDate: '' });
  

  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZoneName: 'short',
    }).replace('GMT+5:30', 'IST');
    setLastSyncTime(formattedTime);
  }, []);

  const statusCounts = dummyData.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const filteredData = dummyData.filter(row => {
    const matchesStatus = !filters.status || filters.status === 'All' || row.status === filters.status;
    const matchesVendor = filters.vendor === 'All' || row.vendor === filters.vendor;
    const matchesSearch = row.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.vendorCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.description.toLowerCase().includes(searchQuery.toLowerCase());
  
    const fromDate = filters.fromDate ? new Date(filters.fromDate.split('/').reverse().join('-')) : null;
    const toDate = filters.toDate ? new Date(filters.toDate.split('/').reverse().join('-')) : null;
    const matchesDate = (!fromDate || new Date(row.dueDate.split('/').reverse().join('-')) >= fromDate) &&
      (!toDate || new Date(row.dueDate.split('/').reverse().join('-')) <= toDate);
  
    return matchesStatus && matchesVendor && matchesSearch && matchesDate;
  });
  

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value || 'All' }));
  };

  const handleStatusChange = (status) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: prevFilters.status === status ? null : status,
    }));
  };

  const handleDateFilterChange = ({ fromDate, toDate }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      fromDate: fromDate || '',
      toDate: toDate || ''
    }));
  };

  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Purchase Orders');

    worksheet.columns = [
      { header: 'Vendor', key: 'vendor', width: 20 },
      { header: 'Vendor Code', key: 'vendorCode', width: 15 },
      { header: 'PO Number', key: 'poNumber', width: 15 },
      { header: 'PO Line', key: 'poLine', width: 10 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'PO Value', key: 'poValue', width: 15 },
      { header: 'Qty Ordered', key: 'qtyOrdered', width: 15 },
      { header: 'Qty Shipped', key: 'qtyShipped', width: 15 },
      { header: 'GR Quantity', key: 'grQuantity', width: 15 },
      { header: 'UOM', key: 'uom', width: 10 },
      { header: 'Due Date', key: 'dueDate', width: 15 },
      { header: 'Committed Date', key: 'committedDate', width: 15 },
      { header: 'Status', key: 'status', width: 20 },
    ];

    filteredData.forEach((row) => {
      worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'PurchaseTable.xlsx');
    });
  };


  return (
    <div style={{ width: '100%' }}>
      <Header />
      <Container maxWidth={false} sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Box mt={2} display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center">
            <DescriptionIcon sx={{ mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Purchase Orders
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{ mr: 2 }}>
              Last ERP sync: {lastSyncTime}
            </Typography>
            <IconButton color="primary" aria-label="re-sync">
              <SyncIcon />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1, color: '#007bff' }}>
              Re-Sync
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box mt={3} width="100%">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <StatusFilter
                statusCounts={statusCounts}
                selectedStatus={filters.status}
                onStatusChange={handleStatusChange}
              />
            </Grid>
            <Grid item xs={2} ml={14} mr={-1}>
              <SearchBar onSearch={setSearchQuery} />
            </Grid>
            <Grid item xs={1} display="flex" justifyContent="flex-end">
            <Tooltip title="Export to Excel" arrow>
              <IconButton onClick={handleExport}>
                <SaveAltIcon sx={{ color: 'green' }} />
              </IconButton>
            </Tooltip>
          </Grid>
          </Grid>
          <Box mt={3} mb={3} display="flex" alignItems="center">
            <POActions />
            <Box
              display="flex"
              justifyContent="center"
              ml={10}
              sx={{
                border: '1px solid lightgrey',
                borderRadius: '8px', 
                padding: '16px',
              }}
            >
              <FilterSection
                vendors={[...new Set(dummyData.map(item => item.vendor))]}
                statuses={[...new Set(dummyData.map(item => item.status))]}
                onFilterChange={handleFilterChange}
              />
              <DateFilter onDateFilterChange={handleDateFilterChange} />
            </Box>
          </Box>
          <Grid item xs={12}>
            <PurchaseOrderTable data={filteredData} />
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;
