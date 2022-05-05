import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FeedLine from './FeedLine';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function Create() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
    }}>
      <Stack width='800px' margin='0 auto'>
        <input type="text" name="flname"></input>
        <input type="submit" value="생성"></input>
      </Stack>
    </form>
  );
}

export default function FeedLineSelect(props) {

  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => { setValue(newValue); };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', 
        margin: '0 auto', width: '800px' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <FeedLine 
          userName={props.userName} 
          userImg={props.userImg} 
          getMode={props.getMode}
          getUser={props.getUser}
        />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Create></Create>
      </TabPanel>
    </>
  );
}
