import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import CalendarPage from './components/Calendar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TrainingChart from './components/Chart';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EventIcon from '@mui/icons-material/Event';
import BarChartIcon from '@mui/icons-material/BarChart';

function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <AppBar position='static' style={{ background: '#212121' }} >
        <Toolbar>
          <Typography variant="h5">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'ButtonHighlight' }}>
            <TabList onChange={handleChange} centered>
              <Tab label="Customers" icon={<AssignmentIndIcon />} value="1" />
              <Tab label="Trainings" icon={<DirectionsRunIcon />} value="2" />
              <Tab label="Calendar" icon={<EventIcon />} value="3" />
              <Tab label="Chart" icon={<BarChartIcon />} value="4" />
            </TabList>
          </Box>
          <TabPanel value="1"><CustomerList /></TabPanel>
          <TabPanel value="2"><TrainingList /></TabPanel>
          <TabPanel value="3"><CalendarPage /></TabPanel>
          <TabPanel value="4"><TrainingChart /></TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default App;

