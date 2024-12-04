"use client";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Delete } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    "&:disabled": {
      backgroundColor: "#706c61",
      color: "white",
    },
    "&:hover": {
      backgroundColor: "inherit", 
      boxShadow: "none", 
    },
  },
});

const ButtonComponent = ({
  label = "Button",
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
  ...props
}) => {
  const classes = useStyles();

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
          ? classes.root
          : 
            variant === "contained"
            ? `${bgColor} ${textColor}`
            : variant === "outlined"
            ? `text-clr-btn`
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
      {...props}
    >
      {label}
      {children}
    </Button>
  );
};

export default ButtonComponent;
