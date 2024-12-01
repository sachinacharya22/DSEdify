"use client";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import React from "react";

const CheckBoxComponent = ({
  name="",
  disabled = false,
  checked = false,
  onChange = () => {},
  label = "",
  indeterminate = false,
}) => {
  return (
    <>
      <FormControl onChange={!disabled ? onChange : () => {}}>
        <RadioGroup>
          <FormControlLabel
            control={
              <Checkbox
              name={name}
                indeterminate={indeterminate}
                checked={checked}
                size="medium"
                sx={{
                  color: "#1181B2",
                  "&.Mui-checked": {
                    color: "#0F6F9A",
                  },
                  "&.MuiCheckbox-indeterminate": {
                    color: "#0F6F9A !important",
                  },
                }}
              />
            }
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "#4a4a4a",
                fontSize: "13px",
                fontWeight: "600",
              },
            }}
            label={label}
          ></FormControlLabel>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default CheckBoxComponent;
