"use client";
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import mainBg from "@/assets/pages/background.jpeg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ButtonComponent from "@/components/atoms/Buttoncomponent";
import Verification from "@/app/registration/verification";
import StudentInfo from "@/app/registration/student-Info";
import Education from "@/app/registration/education";
import Success from "@/app/registration/success";
import validationRegex from "@/services/utils/regexUtils";
import en from "../../../messages/en.json";
import Image from "next/image";
import { getImageByKey } from "@/services/utils/asset-path-utils";

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
  _RegistrationForm_: { _PageTitle_, _Step_, _Step_3_, _Page_Sub_Title },
  _CommonButtons_: { _BackBtnLabel_, _ContinueBtnLabel_, _SubmitBtnLabel_ },
  _ValidationMessage_: {
    _FieldRequired_,
    _ImageRequired_,
    _Email_,
    _Numbers_,
    _FullName_,
    _Usn_,
    _PermanentCity,
    _Percentage_,
    _CGPA_,
  },
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

  const {
    phNo,
    email,
    fullName,
    whatsappNo,
    usn,
    permanentCity,
    tenthPercentage,
    pucDiploma,
  } = stuRegData;

  const [droppedImage, setDroppedImage] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

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

  const [degrees, setDegrees] = useState([
    {
      id: Date.now(),
      degreeSpecialization: "",
      branch: "",
      gradingSystem: "",
      degreePercentage: "",
      errors: {},
    },
  ]);

  const [backlogs, setBacklogs] = useState({
    earlierBacklogs: false,
    presentBacklogs: false,
  });

  const handleChange = (event) => {
    setStuRegData({
      ...stuRegData,
      [event.target.name]: event.target.value,
    });
  };

  const validatePhoneNumber = () => {
    let formErrors = { phNo: "" };
    let isValid = true;

    if (!phNo) {
      formErrors.phNo = _FieldRequired_;
      isValid = false;
    } else if (!phoneNumberRegex.test(phNo)) {
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
    if (!email) {
      formErrors.email = _FieldRequired_;
      isValid = false;
    } else if (!emailRegex.test(email)) {
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

    if (!fullName) {
      formErrors.fullName = _FieldRequired_;
      isValid = false;
    } else if (!personNameRegex.test(fullName)) {
      formErrors.fullName = _FullName_;
      isValid = false;
    }

    if (!whatsappNo) {
      formErrors.whatsappNo = _FieldRequired_;
      isValid = false;
    } else if (!phoneNumberRegex.test(whatsappNo)) {
      formErrors.whatsappNo = _Numbers_;
      isValid = false;
    }

    if (!usn) {
      formErrors.usn = _FieldRequired_;
      isValid = false;
    } else if (!seatNumberRegex.test(usn)) {
      formErrors.usn = _Usn_;
      isValid = false;
    }

    if (!permanentCity) {
      formErrors.permanentCity = _FieldRequired_;
      isValid = false;
    } else if (!permanentCityRegex.test(permanentCity)) {
      formErrors.permanentCity = _PermanentCity;
      isValid = false;
    }

    if (!tenthPercentage) {
      formErrors.tenthPercentage = _FieldRequired_;
      isValid = false;
    } else if (!percentageRegex.test(tenthPercentage)) {
      formErrors.tenthPercentage = _Percentage_;
      isValid = false;
    }

    if (!pucDiploma) {
      formErrors.pucDiploma = _FieldRequired_;
      isValid = false;
    } else if (!percentageRegex.test(pucDiploma)) {
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

  const verifyPhoneNumber = () => {
    if (validatePhoneNumber()) {
      setStuRegData((prevState) => ({
        ...prevState,
      }));
      return;
    }
  };
  const verifyEmail = () => {
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
              errors={errors}
              isEmailValid={isEmailValid}
              isPhoneValid={isPhoneValid}
              handleChange={handleChange}
              verifyPhoneNumber={verifyPhoneNumber}
              verifyEmail={verifyEmail}
            />
          )}

          {activePage === 2 && (
            <StudentInfo
              stuRegData={stuRegData}
              errors={errors}
              handleChange={handleChange}
              handleCheckBoxChange={handleCheckBoxChange}
              isChecked={isChecked}
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
              handleEarlierBacklogsCheckBox={handleEarlierBacklogsCheckBox}
              handlePresentBacklogsCheckBox={handlePresentBacklogsCheckBox}
              errors={errors}
              validateFields={validateFields}
              setErrors={setErrors}
            />
          )}

          {activePage === 4 && <Success setActivePage={setActivePage} />}

          {[2, 3].includes(activePage) && (
            <Grid className="page-container-common-buttons mt-5" item>
              <ButtonComponent
                muiProps="page-container-back-button border-0"
                label={_BackBtnLabel_}
                showIcon={true}
                icon={<ArrowBackIosIcon />}
                onBtnClick={() => {
                  setActivePage(activePage - 1);
                }}
              />
              <ButtonComponent
                muiProps="page-container-continue-button"
                label={activePage === 2 ? _ContinueBtnLabel_ : _SubmitBtnLabel_}
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
