import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SettingsInputComponent, BarChart } from '@mui/icons-material';
import { OpenViews } from './Dashboard';
import { MouseEventHandler } from 'react';

export const MainListItems = ({
  openViews,
  updateViews
}: { openViews: OpenViews, updateViews: (name: string, state: boolean) => void }) => {
  const handler = (name: 'pins' | 'data'): MouseEventHandler => () => updateViews(name, !openViews[name]);

  return (
    <div>
      <ListItem button onClick={handler('pins')} >
        <ListItemIcon>
          <SettingsInputComponent color={openViews.pins ? 'primary' : 'disabled'} />
        </ListItemIcon>
        <ListItemText primary="Dashboard"/>
      </ListItem>
      <ListItem button onClick={handler('data')}>
        <ListItemIcon>
          <BarChart color={openViews.data ? 'primary' : 'disabled'}/>
        </ListItemIcon>
        <ListItemText primary="View Data"/>
      </ListItem>
    </div>
  )
};
