"use client";
import React, { useState, forwardRef } from "react";
import TextField from "@mui/material/TextField";
import { FormHelperText, Grid, Tooltip, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import "@/styles/input-box.scss";

const InputBoxComponent = forwardRef(
  (
    {
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
      defaultValue = "",
      type = "text",
      placeholder = "",
      sx = {},
      name = "",
      autoComplete = "ON",
      multiline = false,
      rows = 0,
      textLabel = "",
      required = false,
      endIconProp = "",
      maxLength = 255,
      autoFocus = false,
      subText = "",
      ...props
    },
    ref
  ) => {
    const [inputErrorMsg, setInputErrorMsg] = useState("");

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

    const handleInput = (e) => {
      const value = e.target.value;
      if (value.length > maxLength) {
        setInputErrorMsg(`Maximum of ${maxLength} characters are allowed`);
      } else {
        setInputErrorMsg("");
      }
    };

    return (
      <>
        <Grid mb="3px" px="6px">
          <Typography
            className="fs-12 fw-600"
            sx={{ color: disabled ? "#acc" : "#1f3763" }}
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
            className: "input-color",
          }}
          color={color}
          fullWidth={fullWidth}
          size={size}
          defaultValue={defaultValue}
          type={type}
          autoFocus={autoFocus}
          inputRef={ref}
          sx={{
            ...fileTypeStyles,
            ...sx,
          }}
          className="custom-text-field text-field-root"
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
                    className="divider-custom"
                  />
                </>
              ) : (
                endIconProp
              ),
            ...InputProps,
          }}
          onInput={handleInput}
          {...props}
        />
        {(errorText || inputErrorMsg) && (
          <FormHelperText error className="fw-700">
            {errorText || inputErrorMsg}
          </FormHelperText>
        )}
      </>
    );
  }
);

export default InputBoxComponent;
