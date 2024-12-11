"use client";
import React from "react";
import { Grid, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonComponent from "@/components/atoms/Buttoncomponent";
import CheckBoxComponent from "@/components/atoms/CheckBoxComponent";
import InputBoxComponent from "@/components/atoms/InputBoxComponent";
import Image from "next/image";
import en from "../../../../messages/en.json";
import { getImageByKey } from "@/services/utils/asset-path-utils";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  SPECIALIZATION_OPTION,
  BRANCHES,
  PERCENTAGE,
} from "@/constants/options";
import { useFieldArray, useForm } from "react-hook-form";
import { validationSchema } from "@/services/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const {
  _EducationForm_: {
    _DegreeSpecializationTextLabel_,
    _BranchTextLabel_,
    _GradingSystemTextLabel_,
    _DegreePercentageTextlabel_,
    _EarliarBacklogsLabel_,
    _PrsentBacklogsLabel_,
    _AddDegreeBtnLabel_,
    _RemoveDegreeBtnLabel_,
  },
} = en;

const Education = ({
  backlogs = {},
  handleEarlierBacklogsCheckBox = () => {},
  handlePresentBacklogsCheckBox = () => {},
  setActivePage = () => {},
  setStuRegData = () => {},
  activePage = 1,
  stuRegData = {},
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      degrees: stuRegData.degrees || [
        {
          degreeSpecialization: "",
          degreeBranch: "",
          gradingSystem: "",
          degreePercentage: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "degrees",
  });

  const handleAddDegree = () => {
    append({
      degreeSpecialization: "",
      degreeBranch: "",
      gradingSystem: "",
      degreePercentage: "",
    });
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setStuRegData({
      ...stuRegData,
      ...data,
    });
    setActivePage(4);
  };

  const onInvalid = (errors) => console.error(errors);

  return (
    <>
      <Grid
        item
        className="d-flex justify-content-end align-items-center w-90p"
      >
        <ButtonComponent
          muiProps="education-form-add-degree-btn fw-700 fs-16"
          label={_AddDegreeBtnLabel_}
          showIcon={true}
          icon={
            <Image
              className="education-form-add-degree-icon"
              src={getImageByKey("icon__add_button")}
              alt="add btn icon"
            />
          }
          onBtnClick={handleAddDegree}
        />
      </Grid>

      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="scroll-bar-container"
      >
        <Grid
          container
          className="d-flex justify-content-center align-items-baseline"
          spacing={2}
        >
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              {fields.length > 1 && (
                <Grid
                  item
                  className="degrees-container d-flex justify-content-end w-100p"
                >
                  <ButtonComponent
                    muiProps="education-form-remove-degree-btn fs-14 fw-700"
                    label={_RemoveDegreeBtnLabel_}
                    showIcon={true}
                    icon={<DeleteIcon className="icon-red" />}
                    onBtnClick={() => remove(index)}
                  />
                </Grid>
              )}

              <Grid item md={6} xs={12}>
                <InputBoxComponent
                  {...register(`degrees.${index}.degreeSpecialization`)}
                  className="education-form-input-box"
                  textLabel={_DegreeSpecializationTextLabel_}
                  required={true}
                  errorText={
                    errors?.degrees?.[index]?.degreeSpecialization?.message
                  }
                  select
                >
                  {SPECIALIZATION_OPTION.map((option) => (
                    <MenuItem
                      key={option.value}
                      className="menu-item"
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </InputBoxComponent>
              </Grid>

              <Grid item md={6} xs={12}>
                <InputBoxComponent
                  {...register(`degrees.${index}.degreeBranch`)}
                  className="education-form-input-box"
                  textLabel={_BranchTextLabel_}
                  required={true}
                  errorText={errors?.degrees?.[index]?.degreeBranch?.message}
                  select
                >
                  {BRANCHES.map((option) => (
                    <MenuItem
                      key={option.value}
                      className="menu-item"
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </InputBoxComponent>
              </Grid>

              <Grid item md={6} xs={12}>
                <InputBoxComponent
                  {...register(`degrees.${index}.gradingSystem`)}
                  className="education-form-input-box"
                  textLabel={_GradingSystemTextLabel_}
                  required={true}
                  errorText={errors?.degrees?.[index]?.gradingSystem?.message}
                  select
                >
                  {PERCENTAGE.map((percent) => (
                    <MenuItem key={percent.value} value={percent.value}>
                      {percent.label}
                    </MenuItem>
                  ))}
                </InputBoxComponent>
              </Grid>

              <Grid item md={6} xs={12}>
                <InputBoxComponent
                  {...register(`degrees.${index}.degreePercentage`)}
                  className="education-form-input-box"
                  textLabel={_DegreePercentageTextlabel_}
                  required={true}
                  errorText={
                    errors?.degrees?.[index]?.degreePercentage?.message ||
                    errors?.degrees?.[index]?.cgpa?.message
                  }
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        <Grid
          item
          className="w-90p d-flex justify-content-start ps-2 flex-column"
        >
          <CheckBoxComponent
            name="earlierBacklogs"
            label={_EarliarBacklogsLabel_}
            checked={backlogs.earlierBacklogs}
            onChange={handleEarlierBacklogsCheckBox}
          />
          <CheckBoxComponent
            name="presentBacklogs"
            label={_PrsentBacklogsLabel_}
            checked={backlogs.presentBacklogs}
            onChange={handlePresentBacklogsCheckBox}
          />
        </Grid>

        <Grid className="back-continue-btn-container mt-5">
          <ButtonComponent
            muiProps="back-button border-0"
            label={"back"}
            showIcon
            icon={<ArrowBackIosIcon />}
            onBtnClick={() => setActivePage(activePage - 1)}
          />
          <ButtonComponent
            muiProps="continue-button"
            type="submit"
            label={"submit"}
            borderRadius="30px"
          />
        </Grid>
      </form>
    </>
  );
};

export default Education;
