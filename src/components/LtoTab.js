import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Inbox from './timeline/Inbox'
import LTOTimeline from '../pages/LTOTimeline'
import { Grid } from '@mui/material'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel (props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps (index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function BasicTabs (props) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    props.handleChanges(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container>
          <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5} />
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab label='Dashboard' />
              {/* <Tab label='Pictures' /> */}
              <Tab label='Inbox' />
              {/* <Tab label='Neighbors' /> */}
            </Tabs>
          </Grid>
          <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5} />
        </Grid>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* <LTOTimeline
        // email={email}
        // setHideTab={setHideTab}
        /> */}
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={2}>
        <Inbox />
      </CustomTabPanel>
    </Box>
  )
}
