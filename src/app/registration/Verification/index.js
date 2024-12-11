"use client";
import React from "react";
import { Grid, InputAdornment } from "@mui/material";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import InputBoxComponent from "@/components/atoms/InputBoxComponent";
import ButtonComponent from "@/components/atoms/Buttoncomponent";
import en from "../../../../messages/en.json";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verficationValidateSchema } from "@/services/validationSchema";

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
  isPhoneValid = false,
  isEmailValid = false,
  setPhoneValid = () => {},
  setEmailValid = () => {},
  setStuRegData = () => {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(verficationValidateSchema),
    defaultValues: stuRegData,
  });

  const handleNavigate = () => {
    setActivePage(activePage + 1);
  };

  const handlePhoneVerify = async () => {
    const isValid = await trigger("phNo");
    if (isValid) {
      setPhoneValid(true);
    }
  };

  const handleEmailVerify = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      setEmailValid(true);
    }
  };

  const onSubmit = (data) => {
    console.log("Submitting data:", data);
    setStuRegData(data);
    handleNavigate();
  };

  const onInvalid =(errors)=>console.error(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Grid
        container
        className="verification-form"
        mt={{ xs: "60px" }}
        paddingLeft={{ xs: "25px", sm: "30px", md: "30px" }}
        display={"flex"}
        justifyContent={"center"}
      >
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item xs={12} sm={8} md={8}>
            <InputBoxComponent
              {...register("phNo")}
              className="verification-form-input-box"
              textLabel={_PhoneNumberTextLable_}
              required={true}
              type="tel"
              autoFocus={true}
              error={!!errors.phNo}
              errorText={errors.phNo ? errors.phNo.message : " "}
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
              onBtnClick={handlePhoneVerify}
              bgColor={isPhoneValid ? "green" : "bg-btn"}
              disabled={isPhoneValid}
              showIcon={isPhoneValid}
              icon={<DoneAllRoundedIcon />}
              iconPosition="end"
            />
          </Grid>

          <Grid item xs={12} sm={8} md={8}>
            <InputBoxComponent
              {...register("email")}
              className="verification-form-input-box"
              textLabel={_EmailTextLabel_}
              required={true}
              type="email"
              error={!!errors.email}
              errorText={errors.email ? errors.email.message : " "}
              disabled={isEmailValid}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <ButtonComponent
              className="verification-form-email-verified-btn"
              label={isEmailValid ? _VerifiedBtnLabel_ : _VerifyEmailBtnLabel_}
              fullWidth
              onBtnClick={handleEmailVerify}
              bgColor={isEmailValid ? "green" : "bg-btn"}
              disabled={isEmailValid}
              showIcon={isEmailValid}
              icon={<DoneAllRoundedIcon />}
              iconPosition="end"
            />
          </Grid>
        </Grid>

        <Grid item mt={{ xs: 3 }}>
          <ButtonComponent
            type="submit"
            muiProps="verification-form-get-started-btn"
            label={_GetStartedBtn_}
            borderRadius="30px"
            disabled={!(isPhoneValid && isEmailValid)}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default Verification;
