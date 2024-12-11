"use client";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import "@/styles/button-comp.scss";
import en from "../../../../messages/en.json";
const {
  _Components_: { _BtnLabel_ },
} = en;

const ButtonComponent = ({
  label = _BtnLabel_,
  variant = "contained",
  onBtnClick = () => {},
  size = "small",
  muiProps = "",
  borderRadius = "4px",
  textColor = "color-white",
  bgColor = "bg-btn",
  fullWidth = false,
  disabled = false,
  children,
  component = "",
  iconPosition = "start",
  icon = <Delete />,
  showIcon = false,
  sx = {},
  type = "button", 
  ...props
}) => {
  const IconProp = showIcon
    ? iconPosition === "start"
      ? {
          startIcon: icon,
        }
      : { endIcon: icon }
    : {};

  return (
    <Button
      component={component}
      {...IconProp}
      variant={variant}
      onClick={onBtnClick}
      size={size}
      className={`px-3 py-2 ${
        disabled === true
          ? "button-root"
          : variant === "contained"
          ? `${bgColor} ${textColor}`
          : variant === "outlined"
          ? "text-clr-btn"
          : variant === "text"
          ? `${textColor}`
          : ""
      }  
      ${muiProps}`}
      sx={{
        textTransform: "capitalize",
        borderRadius: { borderRadius },
        ...sx,
      }}
      fullWidth={fullWidth}
      disabled={disabled}
      disableFocusRipple
      disableElevation
      type={type} 
      {...props}
    >
      {label}
      {children}
    </Button>
  );
};

export default ButtonComponent;
