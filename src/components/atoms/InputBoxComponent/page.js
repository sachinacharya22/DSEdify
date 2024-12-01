"use client";
import React, {  useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { FormHelperText, Grid, Tooltip, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles({
  customTextField: {
    "& input::placeholder": {
      fontSize: "14px",
    },
  },
  input: {
    color: "#A6A6A6",
  },
});

const InputBoxComponent = ({
  readOnly = false,
  iconName = "",
  id = "",
  label = "",
  variant = "outlined",
  disabled = false,
  errorText = "",
  InputProps = {},
  color = "primary",
  fullWidth = true,
  size = "small",
  value = "",
  type = "text",
  placeholder = "",
  sx = {},
  onChange = () => {},
  onBlur = () => {},
  onClick = () => {},
  onKeyPress = () => {},
  name = "",
  autoComplete = "ON",
  multiline = false,
  rows = 0,
  textLabel = "",
  required = false,
  currency = false,
  endIconProp = "",
  maxLength = 255,
  autoFocus = false,
  subText = "",
  borderRadius="6px",
  ...props
}) => {
  const classes = useStyles();
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [inputErrorMsg, setInputErrorMsg] = useState("");

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    // event.preventDefault();
  };

  const handleWheel = (event) => {
    if (type === "number") {
      event.target.blur();
    }
  };

  const fileTypeStyles =
    type === "file"
      ? {
          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              minHeight: "50px !important",
            },
          },
        }
      : {};

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length > maxLength) {
      setInputErrorMsg(`Maximum of ${maxLength} characters are allowed`);
    } else {
      setInputErrorMsg("");
      if (type === "number") {
        const isValid =
          /^(\d+(\.\d*)?|\.\d+)$/.test(value) && !/[^\d.]/.test(value);
        if (!isValid && Boolean(value.length)) {
          e.preventDefault();
        } else {
          onChange(e);
        }
      } else {
        onChange(e);
      }
    }
  };

  const getType = useMemo(() => {
    if (password.showPassword || type === "number") {
      return "text";
    }
    return type;
  }, [type, password.showPassword]);
  return (
    <>
      <Grid mb="3px" px="6px">
        <Typography
          className="fs-14 fw-600"
          sx={{ color: disabled ? "#ccc" : "#1f3763" }}
        >
          {textLabel}
          {required && <span className="text-danger ms-1">*</span>}
          {subText && <span className="ms-1 fs-12">{subText}</span>}
        </Typography>
      </Grid>
      <TextField
        name={name}
        id={id}
        label={label}
        variant={variant}
        disabled={disabled}
        placeholder={placeholder}
        error={Boolean(errorText)}
        InputLabelProps={{
          shrink: true,
          classes: { root: classes.input },
        }}
        color={color}
        fullWidth={fullWidth}
        size={size}
        value={value ?? ""}
        type={getType}
        autoFocus={autoFocus}
        sx={{
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: "#1181b2",
              borderRadius: borderRadius,
            },
          },
          "& .MuiOutlinedInput-root:focus": {
            "& > fieldset": {
              outline: "#A6A6A6",
              borderRadius: borderRadius,
            },
          },
          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              borderColor: "#A6A6A6",
              borderRadius: borderRadius,
            },
          },
          ...fileTypeStyles,
          ...sx,
        }}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
        onClick={onClick}
        onWheel={handleWheel}
        classes={{ root: classes.customTextField }}
        multiline={multiline}
        rows={rows}
        InputProps={{
          readOnly,
          autoComplete: autoComplete,
          endAdornment:
            iconName === "password" ? (
              <>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{
                    color: "red",
                    background: "#A6A6A6",
                    width: "1.2px !important",
                  }}
                />
                <Tooltip
                  title={
                    password.showPassword ? "Hide Password" : "Show Password"
                  }
                  placement={"top"}
                >
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {password.showPassword ? (
                      <Visibility
                        sx={{
                          fill: "#A6A6A6",
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        sx={{
                          fill: "#A6A6A6",
                        }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              endIconProp
            ),
          ...InputProps,
        }}
        {...props}
      />
      {(errorText || inputErrorMsg) && (
        <FormHelperText error className="fw-700">
          {errorText || inputErrorMsg}
        </FormHelperText>
      )}
    </>
  );
};

export default InputBoxComponent;