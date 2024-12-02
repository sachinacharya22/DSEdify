"use client";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import dragDropBg from "@/assets/icons/dragDropBg.png";
import dragLogo from "@/assets/icons/Group 2.png";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box } from "@mui/system";
import InputBoxComponent from "@/components/atoms/InputBoxComponent/page";
import CheckBoxComponent from "@/components/atoms/CheckBoxComponent/page";
import Image from "next/image";

const StudentInfo = ({
  errors,
  stuRegData,
  handleChange,
  handleCheckBoxChange,
  isChecked,
  setDraggedFiles,
  setDroppedImage,
  droppedImage,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setDraggedFiles(acceptedFiles);
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
        className="drag-drop-bg"
        {...(droppedImage ? {} : getRootProps())}
        sx={{
          backgroundImage: `url(${droppedImage ? null : dragDropBg.src})`,
        }}
      >
        <input {...getInputProps()} />

        {droppedImage && (
          <Grid item className="drop-image-container">
            <Box
              className="dropped-image"
              component="img"
              src={droppedImage}
              alt="dropped-image"
            />
            <RemoveCircleIcon
              className="delete-icon"
              onClick={deleteDroppedImage}
            />
          </Grid>
        )}

        <Grid item className="drag-drop-logo-container">
          {droppedImage ? null : (
            <Image className="drag-drop-logo" src={dragLogo} alt="drag logo" />
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
        className="scroll-bar-container"
        spacing={2}
        alignItems="baseline"
      >
        <Grid item md={6} xs={12}>
          <InputBoxComponent
            textLabel="Full Name"
            required={true}
            type="text"
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            name="fullName"
            value={stuRegData.fullName}
            onChange={(event) => {
              handleChange(event);
            }}
            error={!!errors.fullName}
            errorText={errors.fullName}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputBoxComponent
            textLabel="WhatsApp Number"
            required={true}
            type="tel"
            name="whatsappNo"
            value={stuRegData.whatsappNo}
            onChange={(event) => {
              handleChange(event);
            }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            error={!!errors.whatsappNo}
            errorText={errors.whatsappNo}
            disabled={isChecked}
          />
          <CheckBoxComponent
            label="Same as the primary number"
            checked={isChecked || stuRegData.phNo === stuRegData.whatsappNo}
            onChange={handleCheckBoxChange}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <InputBoxComponent
            textLabel="USN"
            required={true}
            type="text"
            name="usn"
            value={stuRegData.usn}
            onChange={(event) => {
              handleChange(event);
            }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            error={!!errors.usn}
            errorText={errors.usn}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputBoxComponent
            textLabel="Permanent City"
            required={true}
            type="text"
            name="permanentCity"
            value={stuRegData.permanentCity}
            onChange={(event) => {
              handleChange(event);
            }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            error={!!errors.permanentCity}
            errorText={errors.permanentCity}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <InputBoxComponent
            textLabel="10th Percentage"
            required={true}
            type="text"
            name="tenthPercentage"
            value={stuRegData.tenthPercentage}
            onChange={(event) => {
              handleChange(event);
            }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            error={!!errors.tenthPercentage}
            errorText={errors.tenthPercentage}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputBoxComponent
            textLabel="PUC / Diploma Percentage"
            required={true}
            type="text"
            name="pucDiploma"
            value={stuRegData.pucDiploma}
            onChange={(event) => {
              handleChange(event);
            }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            error={!!errors.pucDiploma}
            errorText={errors.pucDiploma}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default StudentInfo;
