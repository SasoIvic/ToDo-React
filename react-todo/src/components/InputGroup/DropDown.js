import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@blueprintjs/core'



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '10vw',
    minWidth: 100,
    '& #dropdown-label, #demo-controlled-open-select':{
        color: props => props ? "black" : "white",
    },
    '& .MuiInput-underline:after':{
        borderBottom: '1px solid maroon',
    }
  },
}));

const ControlledOpenSelect = ({label, menuItems, group, setGroup, defaultGroup, handleDeleteGroup, isDark}) => {

  const classes = useStyles(isDark);
  const [open, setOpen] = React.useState(false);


  useEffect(() => {

    if(defaultGroup)
      setGroup(defaultGroup);

  }, [defaultGroup])

  const handleChange = (event) => { setGroup(event.target.value); };
  const handleOpenClose = () => { setOpen(!open); };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="dropdown-label">{label}</InputLabel>
        <Select
          labelId="dropdown-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleOpenClose}
          onOpen={handleOpenClose}
          value={group}
          onChange={handleChange}
          renderValue={(selected) => selected.name}

        >

          {/* LOOP SKOZI GRUPE */}
          {menuItems && menuItems.map(item => (
            <MenuItem key={item._id} value={item}>{item.name}
            {handleDeleteGroup != null &&
            <div style={{marginLeft: "auto"}}>
              <Button icon="trash" minimal  onClick={(e) => { e.stopPropagation(); handleDeleteGroup(item._id) }}/>
            </div>
            }
            </MenuItem>
          ))}

        </Select>
      </FormControl>
    </div>
  );
}

export default ControlledOpenSelect;
