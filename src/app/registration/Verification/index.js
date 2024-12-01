"use client";
import React from "react";
import { Grid, InputAdornment } from "@mui/material";
import { borderRadius, Box } from "@mui/system";

import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import InputBoxComponent from "@/components/atoms/InputBoxComponent/page";
import ButtonComponent from "@/components/atoms/Buttoncomponent/page";

const Verification = ({
  activePage,
  setActivePage,
  stuRegData,
  isEmailValid,
  isPhoneValid,
  handleChange,
  errors,
  varifyEmail,
  varifyPhoneNumber,
}) => {
  const handleNavigate = () => {
    setActivePage(activePage + 1);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          mb: 2,
          mt: { xs: "60px" },
        }}
      >
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={12} sm={8} md={8}>
            <InputBoxComponent
              textLabel="Primary Phone Number"
              required={true}
              type="tel"
              value={stuRegData.phNo}
              name="phNo"
              onChange={(event) => {
                handleChange(event);
              }}
              error={!!errors.phNo}
              errorText={errors.phNo ? errors.phNo : " "}
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment sx={{ color: "inherit" }} position="start">
                    +91 |{" "}
                  </InputAdornment>
                ),
              }}
              disabled={isPhoneValid}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <ButtonComponent
              label={isPhoneValid ? "verified" : "verify Number"}
              fullWidth
              onBtnClick={varifyPhoneNumber}
              sx={{
                backgroundColor: isPhoneValid ? "green" : "bg-btn",
                borderRadius: "5px",
                "&.Mui-disabled": {
                  backgroundColor: "#22BB33",
                  color: "white",
                },
              }}
              disabled={isPhoneValid}
              showIcon={isPhoneValid ? true : false}
              icon={<DoneAllRoundedIcon />}
              iconPosition="end"
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          mb: 4,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8} md={8}>
            <InputBoxComponent
              textLabel="Email"
              required={true}
              type="email"
              value={stuRegData.email}
              name="email"
              onChange={(event) => {
                handleChange(event);
              }}
              error={!!errors.email}
              errorText={errors.email ? errors.email : " "}
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              disabled={isEmailValid}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <ButtonComponent
              label={isEmailValid ? "Verified" : "Verify  Email"}
              fullWidth
              onBtnClick={varifyEmail}
              sx={{
                backgroundColor: isEmailValid ? "green" : "bg-btn",
                "&.Mui-disabled": {
                  backgroundColor: "#22BB33",
                  color: "white",
                },
              }}
              disabled={isEmailValid}
              showIcon={isEmailValid ? true : false}
              icon={<DoneAllRoundedIcon />}
              iconPosition="end"
            />
          </Grid>
        </Grid>
      </Box>
      <ButtonComponent
        label="Get started"
        borderRadius="30px"
        onBtnClick={handleNavigate}
        sx={{
          background: "#203763",
          width: 200,
          height: 50,
          ":hover": {
            backgroundColor: "#203763",
            color: "white",
          },
        }}
        disabled={!(isPhoneValid && isEmailValid)}
      />
    </>
  );
};

export default Verification;
