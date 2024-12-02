"use client";
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import regLeftBgPageOne from "@/assets/pages/blondguy.png";
import regLeftBgPageTwo from "@/assets/pages/younggirl.png";
import regLeftBgPageThree from "@/assets/pages/laptopguy.png";
import regLeftBgPageFour from "@/assets/pages/ladyimage.png";
import mainBg from "@/assets/pages/background.jpeg";
import DsedifyLogo from "@/assets/logo/edifyLogo.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ButtonComponent from "@/components/atoms/Buttoncomponent/page";
import Verification from "./Verification";
import StudentInfo from "./StudentInfo";
import Education from "./Education";
import Success from "./Success";
import validationMessage from "@/constants/validationMessages/page";
import validationRegex from "@/services/utils/regexUtils";
import Image from "next/image";

const {
  emailRegex,
  phoneNumberRegex,
  personNameRegex,
  seatNumberRegex,
  permanentCityRegex,
  percentageRegex,
  cgpaRegex,
} = validationRegex;
const {
  _FieldRequired_,
  _ImageRequired_,
  _Email_,
  _Numbers_,
  _FullName_,
  _Usn_,
  _PermanentCity,
  _Percentage_,
  _CGPA_,
} = validationMessage;

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

  const [draggedFiles, setDraggedFiles] = useState([]);
  const [droppedImage, setDroppedImage] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const [errors, setErrors] = useState({
    phNo: "",
    email: "",

    fullName: "",
    whatsappNo: "",
    usn: "",
    permanentCity: "",
    tenthPercentage: "",
    pucDiploma: "",
    image: "",

    degreeSpecialization: "",
    branch: "",
    gradingSystem: "",
    degreePercentage: "",
  });

  const handleChange = (event) => {
    setStuRegData({
      ...stuRegData,
      [event.target.name]: event.target.value,
    });
  };

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [degrees, setDegrees] = useState([
    {
      id: Date.now(),
      degreeSpecialization: "",
      branch: "",
      gradingSystem: "",
      degreePercentage: "",
    },
  ]);


  const [backlogs, setBacklogs] = useState({
    earlierBacklogs: false,
    presentBacklogs: false,
  });

  const validatePhoneNumber = () => {
    let formErrors = { phNo: "" };
    let isValid = true;

    if (!stuRegData.phNo) {
      formErrors.phNo = _FieldRequired_;
      isValid = false;
    } else if (!phoneNumberRegex.test(stuRegData.phNo)) {
      formErrors.phNo = _Numbers_;
      isValid = false;
    }

    setErrors(formErrors);
    setIsPhoneValid(isValid);
    return isValid;
  };

  const validateEmail = () => {
    let formErrors = { email: "" };
    let isValid = true;
    if (!stuRegData.email) {
      formErrors.email = _FieldRequired_;
      isValid = false;
    } else if (!emailRegex.test(stuRegData.email)) {
      formErrors.email = _Email_;
      isValid = false;
    }
    setErrors(formErrors);
    setIsEmailValid(isValid);
    return isValid;
  };

  const validateInputFields = () => {
    let formErrors = {};
    let isValid = true;

    if (!stuRegData.fullName) {
      formErrors.fullName = _FieldRequired_;
      isValid = false;
    } else if (!personNameRegex.test(stuRegData.fullName)) {
      formErrors.fullName = _FullName_;
      isValid = false;
    }

    if (!stuRegData.whatsappNo) {
      formErrors.whatsappNo = _FieldRequired_;
      isValid = false;
    } else if (!phoneNumberRegex.test(stuRegData.whatsappNo)) {
      formErrors.whatsappNo = _Numbers_;
      isValid = false;
    }

    if (!stuRegData.usn) {
      formErrors.usn = _FieldRequired_;
      isValid = false;
    } else if (!seatNumberRegex.test(stuRegData.usn)) {
      formErrors.usn = _Usn_;
      isValid = false;
    }

    if (!stuRegData.permanentCity) {
      formErrors.permanentCity = _FieldRequired_;
      isValid = false;
    } else if (!permanentCityRegex.test(stuRegData.permanentCity)) {
      formErrors.permanentCity = _PermanentCity;
      isValid = false;
    }

    if (!stuRegData.tenthPercentage) {
      formErrors.tenthPercentage = _FieldRequired_;
      isValid = false;
    } else if (!percentageRegex.test(stuRegData.tenthPercentage)) {
      formErrors.tenthPercentage = _Percentage_;
      isValid = false;
    }

    if (!stuRegData.pucDiploma) {
      formErrors.pucDiploma = _FieldRequired_;
      isValid = false;
    } else if (!percentageRegex.test(stuRegData.pucDiploma)) {
      formErrors.pucDiploma = _Percentage_;
      isValid = false;
    }

    if (!droppedImage) {
      formErrors.image = _ImageRequired_;
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const validateFields = () => {
    let formErrors = {};
    let isValid = true;

    degrees.forEach((degree, index) => {
      formErrors[index] = {};

      if (!degree.degreeSpecialization) {
        formErrors[index].degreeSpecialization = _FieldRequired_;
        isValid = false;
      }

      if (!degree.branch) {
        formErrors[index].branch = _FieldRequired_;
        isValid = false;
      }

      if (!degree.gradingSystem) {
        formErrors[index].gradingSystem = _FieldRequired_;
        isValid = false;
      }

      if (!degree.degreePercentage) {
        formErrors[index].degreePercentage = _FieldRequired_;
        isValid = false;
      } else if (
        degree.gradingSystem === "cgpa" &&
        !cgpaRegex.test(degree.degreePercentage)
      ) {
        formErrors[index].degreePercentage = _CGPA_;
        isValid = false;
      } else if (
        degree.gradingSystem === "percentage" &&
        !percentageRegex.test(degree.degreePercentage)
      ) {
        formErrors[index].degreePercentage = _Percentage_;
        isValid = false;
      }
    });

    setErrors(formErrors);
    return isValid;
  };

  const validateDegreeFields = () => {
    if (!validateFields()) {
      return;
    }
    setActivePage(activePage + 1);
  };

  const varifyPhoneNumber = () => {
    if (validatePhoneNumber()) {
      setStuRegData((prevState) => ({
        ...prevState,
      }));
      return;
    }
  };
  const varifyEmail = () => {
    if (validateEmail()) {
      setStuRegData((prevState) => ({
        ...prevState,
      }));
      return;
    }
  };

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

  const validateStuInfo = () => {
    if (!validateInputFields()) {
      return;
    }
    setActivePage(activePage + 1);
  };

  const handleValueChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDegrees = [...degrees];
    updatedDegrees[index][name] = value;
    setDegrees(updatedDegrees);
  };

  const handleCheckBoxOne = (event) => {
    const isChecked = event.target.checked;
    setBacklogs((prevData) => ({
      ...prevData,
      earlierBacklogs: isChecked,
    }));
  };

  const handleCheckBoxTwo = (event) => {
    const isChecked = event.target.checked;
    setBacklogs((prevData) => ({
      ...prevData,
      presentBacklogs: isChecked,
    }));
  };

  return (
    <Grid container className="body-container">
      <Grid
        container
        className="left-bg-container vh-100 w-100p d-none d-md-none d-lg-block"
        md={4}
        sx={{
          backgroundImage: `url(${
            activePage === 1
              ? regLeftBgPageOne.src
              : activePage === 2
              ? regLeftBgPageTwo.src
              : activePage === 3
              ? regLeftBgPageThree.src
              : regLeftBgPageFour.src
          })`,
        }}
      ></Grid>

      <Grid
        container
        className="main-bg-container vh-100 col-md-12 col-sm-12 col-xs-12 col-lg-8"
        sx={{ backgroundImage: `url(${mainBg.src})` }}
      >
        {activePage === 4 ? null : (
          <Grid item className="steps-text-container w-100p">
            <Typography className="steps-text fw-700">
              Step <span className="steps-span-text">{activePage}</span>/3
            </Typography>
          </Grid>
        )}

        <Grid item className="logo-container vh-100 w-100p">
          <Image src={DsedifyLogo} alt="DS-Edify-Log" className="edify-logo" />
          {activePage === 4 ? null : (
            <>
              <Typography className="main-title fw-700 mt-1" variant="h4">
                Student Registration Form
              </Typography>

              <Typography className="sub-title mb-1" variant="h6">
                Drive Code: ABC123
              </Typography>
            </>
          )}

          {/* ------------------------------------------------------------------------------------------------------------------ */}

          {activePage === 1 && (
            <Verification
              activePage={activePage}
              setActivePage={setActivePage}
              stuRegData={stuRegData}
              errors={errors}
              isEmailValid={isEmailValid}
              isPhoneValid={isPhoneValid}
              handleChange={handleChange}
              varifyPhoneNumber={varifyPhoneNumber}
              varifyEmail={varifyEmail}
            />
          )}

          {activePage === 2 && (
            <StudentInfo
              stuRegData={stuRegData}
              errors={errors}
              handleChange={handleChange}
              handleCheckBoxChange={handleCheckBoxChange}
              isChecked={isChecked}
              setDraggedFiles={setDraggedFiles}
              setDroppedImage={setDroppedImage}
              droppedImage={droppedImage}
            />
          )}

          {activePage === 3 && (
            <Education
              degrees={degrees}
              setDegrees={setDegrees}
              backlogs={backlogs}
              handleValueChange={handleValueChange}
              handleCheckBoxOne={handleCheckBoxOne}
              handleCheckBoxTwo={handleCheckBoxTwo}
              errors={errors}
              validateFields={validateFields}
            />
          )}

          {activePage === 4 && <Success setActivePage={setActivePage} />}

          {/* ------------------------------------------------------------------------------------------------------------------ */}

          {activePage === 1 || activePage === 4 ? null : (
            <Grid className="common-btn" item sx={{ width: "87%", mt: 7 }}>
              <ButtonComponent
                muiProps="back-btn-component border-0"
                label="Back"
                showIcon={true}
                icon={<ArrowBackIosIcon />}
                onBtnClick={() => {
                  setActivePage(activePage - 1);
                }}
              />
              <ButtonComponent
                muiProps="continue-btn-component"
                label={activePage === 2 ? "Continue" : "submit"}
                borderRadius="30px"
                onBtnClick={() =>
                  activePage === 2 ? validateStuInfo() : validateDegreeFields()
                }
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Registration;
