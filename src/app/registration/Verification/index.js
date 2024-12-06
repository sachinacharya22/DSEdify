"use client";
import React from "react";
import { Grid, InputAdornment } from "@mui/material";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import InputBoxComponent from "@/components/atoms/InputBoxComponent";
import ButtonComponent from "@/components/atoms/Buttoncomponent";
import en from "../../../../messages/en.json";
const {
  _VerificationForm_: {
    _PhoneNumberTextLable_,
    _PhoneNumberInputAdornment_,
    _EmailTextLabel_,
    _VerifyNumberBtnLabel_,
    _VerifyEmailBtnLabel_,
    _VerifiedBtnLabel_,
    _GetStartedBtn_,
  },
} = en;

const Verification = ({
  activePage = 1,
  setActivePage = () => {},
  stuRegData = {},
  isEmailValid = false,
  isPhoneValid = false,
  handleChange = () => {},
  errors = {},
  verifyEmail = () => {},
  verifyPhoneNumber = () => {},
}) => {
  const { phNo, email } = stuRegData;
  const { phNo: errPhno, email: errEmail } = errors;

  const handleNavigate = () => {
    setActivePage(activePage + 1);
  };
  return (
    <>
      <Grid container className="verification-form" mt={{ xs: "60px" }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={12} sm={8} md={8}>
            <InputBoxComponent
              className="verification-form-input-box"
              textLabel={_PhoneNumberTextLable_}
              required={true}
              type="tel"
              value={phNo}
              name="phNo"
              autoFocus={true}
              onChange={(event) => {
                handleChange(event);
              }}
              error={!!errPhno}
              errorText={errPhno ? errPhno : " "}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className="verification-form-input-adornment"
                    position="start"
                  >
                    {_PhoneNumberInputAdornment_}
                  </InputAdornment>
                ),
              }}
              disabled={isPhoneValid}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <ButtonComponent
              label={isPhoneValid ? _VerifiedBtnLabel_ : _VerifyNumberBtnLabel_}
              fullWidth
              className="verification-form-phone-verified-btn"
              onBtnClick={verifyPhoneNumber}
              bgColor={isPhoneValid ? "green" : "bg-btn"}
              disabled={isPhoneValid}
              showIcon={isPhoneValid ? true : false}
              icon={<DoneAllRoundedIcon />}
              iconPosition="end"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container className="verification-form-email-container">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8} md={8}>
            <InputBoxComponent
              className="verification-form-input-box"
              textLabel={_EmailTextLabel_}
              required={true}
              type="email"
              value={email}
              name="email"
              onChange={(event) => {
                handleChange(event);
              }}
              error={!!errEmail}
              errorText={errEmail ? errEmail : " "}
              disabled={isEmailValid}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <ButtonComponent
              className="verification-form-email-verified-btn"
              label={isEmailValid ? _VerifiedBtnLabel_ : _VerifyEmailBtnLabel_}
              fullWidth
              onBtnClick={verifyEmail}
              bgColor={isEmailValid ? "green" : "bg-btn"}
              disabled={isEmailValid}
              showIcon={isEmailValid ? true : false}
              icon={<DoneAllRoundedIcon />}
              iconPosition="end"
            />
          </Grid>
        </Grid>
      </Grid>
      <ButtonComponent
        muiProps="verification-form-get-started-btn"
        label={_GetStartedBtn_}
        borderRadius="30px"
        onBtnClick={handleNavigate}
        disabled={!(isPhoneValid && isEmailValid)}
      />
    </>
  );
};

export default Verification;
