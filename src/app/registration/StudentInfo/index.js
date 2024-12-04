"use client";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import dragDropBg from "@/assets/icons/dragDropBg.png";
import dragLogo from "@/assets/icons/Group 2.png";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box } from "@mui/system";
import InputBoxComponent from "@/components/atoms/InputBoxComponent";
import CheckBoxComponent from "@/components/atoms/CheckBoxComponent";
import Image from "next/image";
import en from "../../../../messages/en.json";

const {
  _StudentInfoForm_: {
    _FullNameTextLabel_,
    _WhatsappNoTextLabel_,
    _UsnTextLabel_,
    _PermanentCityTextLabel_,
    _TenthPercentageTextLabel_,
    _PucDiplomaPercentage_,
  },
} = en;

const StudentInfo = ({
  errors = {},
  stuRegData = {},
  handleChange = () => {},
  handleCheckBoxChange = () => {},
  isChecked = false,
  setDroppedImage = () => {},
  droppedImage = null,
}) => {
  const {
    phNo,
    fullName,
    whatsappNo,
    usn,
    permanentCity,
    tenthPercentage,
    pucDiploma,
  } = stuRegData;
  const {
    fullName: errFullName,
    whatsappNo: errwhatsappNo,
    usn: errUsn,
    permanentCity: errPermanentCity,
    tenthPercentage: errTenthPercentage,
    pucDiploma: errPucDiploma,
  } = errors;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setDroppedImage(URL.createObjectURL(acceptedFiles[0]));
    },
    accept: {
      "image/*": [],
    },
  });

  const deleteDroppedImage = () => {
    setDroppedImage(null);
  };

  return (
    <>
      <Grid
        container
        className="student-info-form-drag-drop-bg"
        {...(droppedImage ? {} : getRootProps())}
        sx={{
          backgroundImage: `url(${droppedImage ? null : dragDropBg.src})`,
        }}
      >
        <input {...getInputProps()} />

        {droppedImage && (
          <Grid item className="student-info-form-dropped-image-container">
            <Box
              className="student-info-form-dropped-image"
              component="img"
              src={droppedImage}
              alt="dropped-image"
            />
            <RemoveCircleIcon
              className="student-info-form-delete-icon"
              onClick={deleteDroppedImage}
            />
          </Grid>
        )}

        <Grid item className="student-info-form-drag-drop-icon-container">
          {droppedImage ? null : (
            <Image className="student-info-form-drag-drop-icon" src={dragLogo} alt="drag logo" />
          )}
        </Grid>
      </Grid>

      {errors.image && (
        <Typography className="fw-600 mt-1" color="error" variant="body2">
          {errors.image}
        </Typography>
      )}

      <Grid
        container
        className="student-info-form-container"
        spacing={2}
        alignItems="baseline"
      >
        <Grid item md={6} xs={12}>
          <InputBoxComponent
            textLabel={_FullNameTextLabel_}
            required={true}
            type="text"
            className="student-info-form-input"
            name="fullName"
            value={fullName}
            onChange={(event) => {
              handleChange(event);
            }}
            error={!!errFullName}
            errorText={errFullName}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputBoxComponent
            className="student-info-form-input"
            textLabel={_WhatsappNoTextLabel_}
            required={true}
            type="tel"
            name="whatsappNo"
            value={whatsappNo}
            onChange={(event) => {
              handleChange(event);
            }}
            error={!!errwhatsappNo}
            errorText={errwhatsappNo}
            disabled={isChecked}
          />
          <CheckBoxComponent
            label="Same as the primary number"
            checked={isChecked || phNo === whatsappNo}
            onChange={handleCheckBoxChange}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <InputBoxComponent
            className="student-info-form-input"
            textLabel={_UsnTextLabel_}
            required={true}
            type="text"
            name="usn"
            value={usn}
            onChange={(event) => {
              handleChange(event);
            }}
            error={!!errUsn}
            errorText={errUsn}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputBoxComponent
            className="student-info-form-input"
            textLabel={_PermanentCityTextLabel_}
            required={true}
            type="text"
            name="permanentCity"
            value={permanentCity}
            onChange={(event) => {
              handleChange(event);
            }}
            error={!!errPermanentCity}
            errorText={errPermanentCity}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <InputBoxComponent
            className="student-info-form-input"
            textLabel={_TenthPercentageTextLabel_}
            required={true}
            type="text"
            name="tenthPercentage"
            value={tenthPercentage}
            onChange={(event) => {
              handleChange(event);
            }}
            error={!!errTenthPercentage}
            errorText={errTenthPercentage}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputBoxComponent
            className="student-info-form-input"
            textLabel={_PucDiplomaPercentage_}
            required={true}
            type="text"
            name="pucDiploma"
            value={pucDiploma}
            onChange={(event) => {
              handleChange(event);
            }}
            error={!!errPucDiploma}
            errorText={errPucDiploma}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default StudentInfo;
