"use client";
import React from "react";

import { Grid, Typography } from "@mui/material";
import celebration from "@/assets/icons/celebration.png";
import backBtnIcon from "@/assets/icons/Vector.png";
import ButtonComponent from "@/components/atoms/Buttoncomponent/page";
import Image from "next/image";

const Success = ({ setActivePage }) => {
  return (
    <>
      <Grid
        item
        sx={{
          mb: { xs: 0, md: 2 },
        }}
      >
        <Image
          className="celebration-bg w-100p"
          src={celebration}
          alt="Celebration Icon"
          style={{
            maxWidth: "250px",
            height: "auto",
            marginBottom: "1rem",
          }}
        />
      </Grid>

      <Typography
        className="fw-700"
        variant="h4"
        sx={{
          color: "#F47F20",
          mb: 1,
          fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
        }}
      >
        Congratulations
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "#203763",
          mb: 3,
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
        }}
      >
        Registration Successful
      </Typography>

      <ButtonComponent
        label="Back To Home"
        onBtnClick={() => {
          setActivePage(1);
        }}
        borderRadius="20px"
        sx={{
          backgroundColor: "#203763",
          color: "white",
          fontSize: { xs: "0.9rem", sm: "1rem" },
          padding: { xs: "8px 16px", sm: "10px 20px" },
          maxWidth: "200px",
          width: "100%",
          ":hover": {
            backgroundColor: "#203763",
            color: "white",
          },
        }}
        showIcon={true}
        icon={
          <Image
            src={backBtnIcon}
            alt="back button icon"
            style={{ width: "20px", height: "auto" }}
          />
        }
      />
    </>
  );
};

export default Success;
