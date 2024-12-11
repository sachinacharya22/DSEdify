"use client";

import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InputBoxComponent from "@/components/atoms/InputBoxComponent";
import CheckBoxComponent from "@/components/atoms/CheckBoxComponent";
import dragDropBg from "@/assets/icons/drag-drop-bg.png";
import dragLogo from "@/assets/icons/drag-drop-icon.png";
import en from "../../../../messages/en.json";
import { studentInfoValidateSchema } from "@/services/validationSchema";
import ButtonComponent from "@/components/atoms/Buttoncomponent";
import { useForm } from "react-hook-form";

const {
  _StudentInfoForm_: {
    _FullNameTextLabel_,
    _WhatsappNoTextLabel_,
    _UsnTextLabel_,
    _PermanentCityTextLabel_,
    _TenthPercentageTextLabel_,
    _PucDiplomaPercentage_,
    _CheckBoxLabel_,
  },
} = en;

const StudentInfo = ({
  stuRegData = {},
  isChecked = false,
  setDroppedImage = () => {},
  droppedImage = null,
  activePage = 1,
  setActivePage = () => {},
  setStuRegData = () => {},
  setIsChecked = () => {},
}) => {
  const { phNo } = stuRegData;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentInfoValidateSchema),
    defaultValues: stuRegData,
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue("imageUpload", file, { shouldValidate: true });
        setDroppedImage(URL.createObjectURL(file));
      }
    },
    accept: {
      "image/*": [],
    },
  });

  const onSubmit = (data) => {
    setStuRegData(data);
    setActivePage(activePage + 1);
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (checked) {
      setValue("whatsappNo", phNo);
    } else {
      setValue("whatsappNo", "");
    }
  };

  const {
    fullName,
    whatsappNo,
    usn,
    permanentCity,
    tenthPercentage,
    pucDiploma,
  } = studentInfoValidateSchema;

  const fields = [
    {
      name: "fullName",
      label: _FullNameTextLabel_,
      validation: fullName,
      required: true,
      isCheckbox: false,
    },
    {
      name: "whatsappNo",
      label: _WhatsappNoTextLabel_,
      validation: whatsappNo,
      required: true,
      isCheckbox: true,
    },
    {
      name: "usn",
      label: _UsnTextLabel_,
      validation: usn,
      required: true,
      isCheckbox: false,
    },
    {
      name: "permanentCity",
      label: _PermanentCityTextLabel_,
      validation: permanentCity,
      required: true,
      isCheckbox: false,
    },
    {
      name: "tenthPercentage",
      label: _TenthPercentageTextLabel_,
      validation: tenthPercentage,
      required: true,
      isCheckbox: false,
    },
    {
      name: "pucDiploma",
      label: _PucDiplomaPercentage_,
      validation: pucDiploma,
      required: true,
      isCheckbox: false,
    },
  ];

  return (
    <>
      <Grid
        container
        className="student-info-form-drag-drop-bg"
        {...(droppedImage ? {} : getRootProps())}
        sx={{
          backgroundImage: `url(${droppedImage ? "" : dragDropBg.src})`,
        }}
      >
        <input
          {...getInputProps()}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setValue("imageUpload", file, { shouldValidate: true });
              setDroppedImage(URL.createObjectURL(file));
            }
          }}
        />
        {droppedImage ? (
          <Grid item className="student-info-form-dropped-image-container">
            <Box
              className="student-info-form-dropped-image"
              component="img"
              src={droppedImage}
              alt="dropped-image"
            />
            <RemoveCircleIcon
              className="student-info-form-delete-icon"
              onClick={() => {
                setDroppedImage(null);
                setValue("imageUpload", null, { shouldValidate: true });
              }}
            />
          </Grid>
        ) : (
          <Grid item className="student-info-form-drag-drop-icon-container">
            <Image
              className="student-info-form-drag-drop-icon"
              src={dragLogo}
              alt="drag logo"
            />
          </Grid>
        )}
      </Grid>
      {errors.imageUpload && (
        <Typography className="fw-600 mt-1" color="error" variant="body2">
          {errors.imageUpload.message}
        </Typography>
      )}

      <form
        className="student-info-form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2} alignItems="baseline">
          {fields.map((field, index) => (
            <Grid item md={6} xs={12} key={index}>
              <InputBoxComponent
                className="student-info-form-input"
                {...register(field.name)}
                textLabel={field.label}
                required={field.required}
                error={!!errors[field.name]}
                errorText={errors[field.name]?.message}
                disabled={field.name === "whatsappNo" && isChecked}
              />
              {field.isCheckbox && (
                <CheckBoxComponent
                  label={_CheckBoxLabel_}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <Grid className="student-info-form-container__btn-container mt-5">
          <ButtonComponent
            muiProps="page-container-back-button border-0"
            label="Back"
            showIcon
            icon={<ArrowBackIosIcon />}
            onBtnClick={() => setActivePage(activePage - 1)}
          />
          <ButtonComponent
            muiProps="page-container-continue-button"
            type="submit"
            label="Continue"
            borderRadius="30px"
          />
        </Grid>
      </form>
    </>
  );
};

export default StudentInfo;
