import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: '100%',
    '& #standard-basic-label, #standard-basic':{
        color: props => props ? "black" : "white"
    },
    '& .MuiFormControl-root.MuiTextField-root':{
      width: '90%',
    },
    '& .MuiInput-underline:after':{
        borderBottom: '1px solid maroon',
    },
  },
}));

const InputField = ({label, textarea, setValue, defaultValue, isDark}) => {
  const classes = useStyles(isDark);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label={label}
        multiline={textarea ? true : false}
        value={defaultValue}

        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}

export default InputField
