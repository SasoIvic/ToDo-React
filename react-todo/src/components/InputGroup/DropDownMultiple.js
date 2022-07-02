import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '10vw',
    minWidth: 100,
    '& #demo-mutiple-checkbox-label, #demo-mutiple-checkbox':{
        color: props => props ? "black" : "white"
    },
    '& .MuiInput-underline:after':{
        borderBottom: '1px solid maroon',
    },
  },

}));


const MultipleDropdown = ({label, menuItems, value, setValue, isDark}) => {

  const classes = useStyles(isDark);

  const handleChange = (event) => { 
    setValue(event.target.value); 
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={value}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.map(s => s.name).join(", ")}
        >

          {/* LOOP SKOZI TAGE */}
          {menuItems && menuItems.map(item => (
            <MenuItem key={item._id} value={item}>
              <Checkbox 
                style ={{color: "maroon"}}
                checked={value.indexOf(item) > -1} 
              />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}

        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleDropdown;
