import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: '100%',
    
    '& .MuiInput-input, #date-label':{
        color: props => props ? "black" : "white",
    },
    '& .MuiFormControl-root.MuiTextField-root':{
        width: '90%',
    },
    '& .MuiInput-underline:after':{
        borderBottom: '1px solid maroon',
    },
  },
}));

const InputField = ({label, setValue, defaultValue, isDark}) => {
  const classes = useStyles(isDark);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="date"
        label={label}
        type="date"
        defaultValue={defaultValue}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}

export default InputField
