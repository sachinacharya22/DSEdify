"use client";
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Verification from "@/app/registration/verification";
import StudentInfo from "@/app/registration/student-Info";
import Education from "@/app/registration/education";
import Success from "@/app/registration/success";
import en from "../../../messages/en.json";
import Image from "next/image";
import { getImageByKey } from "@/services/utils/asset-path-utils";

const {
  _RegistrationForm_: { _PageTitle_, _Step_, _Step_3_, _Page_Sub_Title },
} = en;

const Registration = () => {
  const [activePage, setActivePage] = useState(1);

  const [stuRegData, setStuRegData] = useState({
    phNo: "",
    email: "",
    fullName: "",
    whatsappNo: "",
    usn: "",
    permanentCity: "",
    tenthPercentage: "",
    pucDiploma: "",
  });
  console.log("stuRegData", stuRegData);

  const handleChange = (event) => {
    setStuRegData({
      ...stuRegData,
      [event.target.name]: event.target.value,
    });
  };

  const [droppedImage, setDroppedImage] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const [isPhoneValid, setPhoneValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);

  const [backlogs, setBacklogs] = useState({
    earlierBacklogs: false,
    presentBacklogs: false,
  });

  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setStuRegData({
        ...stuRegData,
        whatsappNo: stuRegData.phNo || "",
      });
    } else {
      setStuRegData({
        ...stuRegData,
        whatsappNo: "",
      });
    }
  };

  const handleEarlierBacklogsCheckBox = (event) => {
    const isChecked = event.target.checked;
    setBacklogs((prevData) => ({
      ...prevData,
      earlierBacklogs: isChecked,
    }));
  };

  const handlePresentBacklogsCheckBox = (event) => {
    const isChecked = event.target.checked;
    setBacklogs((prevData) => ({
      ...prevData,
      presentBacklogs: isChecked,
    }));
  };

  const getBackgroundImage = (activePage) => {
    switch (activePage) {
      case 1:
        return getImageByKey("registration__page__1");
      case 2:
        return getImageByKey("registration__page__2");
      case 3:
        return getImageByKey("registration__page__3");
      case 4:
        return getImageByKey("registration__page__4");
      default:
        return null;
    }
  };

  return (
    <Grid container className="page-container">
      <Grid
        container
        className="page-container__left-background vh-100 d-none d-md-none d-lg-block"
        md={4}
      >
        <Image
          className="page-container__left-background"
          src={getBackgroundImage(activePage)}
          alt="left-bg"
          fill
          quality={100}
        />
      </Grid>

      <Grid
        container
        className="page-container__main-background vh-100 col-md-12 col-sm-12 col-xs-12 col-lg-8"
      >
        <Image
          className="page-container-main-background"
          src={getImageByKey("background__main")}
          alt="main-bg"
          fill
          objectFit="cover"
        />
        {activePage === 4 ? null : (
          <Grid
            item
            className="page-container__main-background__steps-text w-100p"
          >
            <Typography className="page-container-steps-text-title fw-700">
              {_Step_}{" "}
              <span className="page-container-current-step">{activePage}</span>
              {_Step_3_}
            </Typography>
          </Grid>
        )}

        <Grid item className="page-container-logo-container vh-100 w-100p">
          <Image
            src={getImageByKey("logo__edify")}
            alt="DS-Edify-Log"
            className="page-container-logo"
          />
          {activePage === 4 ? null : (
            <>
              <Typography
                className="page-container-title fw-700 mt-1"
                variant="h4"
              >
                {_PageTitle_}
              </Typography>

              <Typography
                className="page-container-sub-title mb-1 fw-700"
                variant="h6"
              >
                {_Page_Sub_Title}
              </Typography>
            </>
          )}

          {activePage === 1 && (
            <Verification
              activePage={activePage}
              setActivePage={setActivePage}
              stuRegData={stuRegData}
              setStuRegData={setStuRegData}
              setPhoneValid={setPhoneValid}
              setEmailValid={setEmailValid}
              isPhoneValid={isPhoneValid}
              isEmailValid={isEmailValid}
              handleChange={handleChange}
            />
          )}

          {activePage === 2 && (
            <StudentInfo
              stuRegData={stuRegData}
              handleCheckBoxChange={handleCheckBoxChange}
              isChecked={isChecked}
              setDroppedImage={setDroppedImage}
              droppedImage={droppedImage}
              setActivePage={setActivePage}
              activePage={activePage}
              setStuRegData={setStuRegData}
              setIsChecked={setIsChecked}
            />
          )}

          {activePage === 3 && (
            <Education
              backlogs={backlogs}
              handleEarlierBacklogsCheckBox={handleEarlierBacklogsCheckBox}
              handlePresentBacklogsCheckBox={handlePresentBacklogsCheckBox}
              setActivePage={setActivePage}
              setStuRegData={setStuRegData}
              activePage={activePage}
              stuRegData={stuRegData}
            />
          )}

          {activePage === 4 && <Success setActivePage={setActivePage} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Registration;
