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
}) => {
  return (
    <>
      <FormControl onChange={!disabled ? onChange : () => {}}>
        <RadioGroup>
          <FormControlLabel
            control={
              <Checkbox
              name={name}
                checked={checked}
                size="medium"
                sx={{
                  color: "#1181B2",
                  "&.Mui-checked": {
                    color: "#0F6F9A",
                  },
                }}
              />
            }
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "#4a4a4a",
                fontSize: "12px",
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