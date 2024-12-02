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
      <Grid item className="mb-2">
        <Image
          className="celebration-bg w-100p h-auto mb-1 mw-25"
          src={celebration}
          alt="Celebration Icon"
        />
      </Grid>

      <Typography className="cong-text fw-700 mb-1" variant="h4">
        Congratulations
      </Typography>

      <Typography className="success-text fw-600 mb-3" variant="h5">
        Registration Successful
      </Typography>

      <ButtonComponent
        className="back-to-home-btn w-100p"
        label="Back To Home"
        onBtnClick={() => {
          setActivePage(1);
        }}
        showIcon={true}
        icon={
          <Image
            className="w-120p h-auto"
            src={backBtnIcon}
            alt="back button icon"
          />
        }
      />
    </>
  );
};

export default Success;
