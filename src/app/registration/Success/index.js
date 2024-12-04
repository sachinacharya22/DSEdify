"use client";
import React from "react";
import { Grid, Typography } from "@mui/material";
import celebration from "@/assets/icons/celebration.png";
import backBtnIcon from "@/assets/icons/Vector.png";
import ButtonComponent from "@/components/atoms/Buttoncomponent";
import Image from "next/image";
import en from "../../../../messages/en.json";

const {
  _CongratulationsPage_: { _Title_, _SubTitle_, _BackToHomeBtnLabel_ },
} = en;
const Success = ({ setActivePage }) => {
  return (
    <>
      <Grid item className="congratulations-page-image-container mb-2">
        <Image
          className="congratulations-page-image w-100p h-auto mb-1 mw-25"
          src={celebration}
          alt="Celebration Icon"
        />
      </Grid>

      <Typography className="congratulations-page-title fw-700 mb-1" variant="h4">
        {_Title_}
      </Typography>

      <Typography className="congratulations-page-subtitle fw-600 mb-3" variant="h5">
        {_SubTitle_}
      </Typography>

      <ButtonComponent
        className="congratulations-page-back-to-home-btn w-100p"
        label={_BackToHomeBtnLabel_}
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
