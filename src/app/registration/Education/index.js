import React from "react";
import { Grid, MenuItem } from "@mui/material";
import AddBtnIcon from "@/assets/icons/Frame.png";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonComponent from "@/components/atoms/Buttoncomponent";
import CheckBoxComponent from "@/components/atoms/CheckBoxComponent";
import InputBoxComponent from "@/components/atoms/InputBoxComponent";
import Image from "next/image";
import en from "../../../../messages/en.json";
import {
  specializationOptions,
  branches,
  percentage,
} from "@/constants/options";

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
  degrees = {},
  setDegrees = () => {},
  backlogs = {},
  handleValueChange = () => {},
  handleCheckBoxOne = () => {},
  handleCheckBoxTwo = () => {},
  errors = {},
  setErrors = () => {},
  validateFields = () => {},
}) => {
  const handleAddDegree = () => {
    if (!validateFields()) {
      return;
    }
    setDegrees([
      {
        id: Date.now(),
        degreeSpecialization: "",
        branch: "",
        gradingSystem: "",
        degreePercentage: "",
        errors: {},
      },
      ...degrees,
    ]);
  };

  const handleRemoveDegree = (id) => {
    if (degrees.length > 1) {
      setDegrees((prevDegree) =>
        prevDegree.filter((degree) => degree.id !== id)
      );
      setErrors(
        {
          degreeSpecialization: "",
          branch: "",
          gradingSystem: "",
          degreePercentage: "",
        }
      )
    }
  };

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
              src={AddBtnIcon}
              alt="add btn icon"
            />
          }
          onBtnClick={handleAddDegree}
        />
      </Grid>

      <Grid
        container
        className="scroll-bar-container d-flex justify-content-center align-items-baseline"
        spacing={2}
      >
        {degrees.map(
          (
            {
              id,
              degreeSpecialization,
              branch,
              gradingSystem,
              degreePercentage,
            },
            index
          ) => (
            <>
              {degrees.length > 1 && (
                <Grid
                  item
                  className="degrees-container d-flex justify-content-end w-100p"
                >
                  <ButtonComponent
                    muiProps="education-form-remove-degree-btn fs-14 fw-700"
                    label={_RemoveDegreeBtnLabel_}
                    showIcon={true}
                    icon={<DeleteIcon className="icon-red" />}
                    onBtnClick={() => {
                      handleRemoveDegree(id);
                    }}
                  />
                </Grid>
              )}
              <Grid item key={index} md={6} xs={12}>
                <InputBoxComponent
                  className="education-form-input-box"
                  textLabel={_DegreeSpecializationTextLabel_}
                  required={true}
                  type="text"
                  name="degreeSpecialization"
                  value={degreeSpecialization}
                  onChange={(event) => handleValueChange(index, event)}
                  errors={!!errors[index]?.degreeSpecialization}
                  errorText={errors[index]?.degreeSpecialization}
                  select
                >
                  {specializationOptions.map((option) => (
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
                  className="education-form-input-box"
                  textLabel={_BranchTextLabel_}
                  required={true}
                  type="text"
                  value={branch}
                  name="branch"
                  onChange={(event) => handleValueChange(index, event)}
                  errors={!!errors[index]?.branch}
                  errorText={errors[index]?.branch}
                  select
                >
                  {branches.map((option) => (
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

              <Grid item md={6} xs={12} mt={0}>
                <InputBoxComponent
                  className="education-form-input-box"
                  textLabel={_GradingSystemTextLabel_}
                  required={true}
                  type="text"
                  value={gradingSystem}
                  name="gradingSystem"
                  onChange={(event) => handleValueChange(index, event)}
                  errors={!!errors[index]?.gradingSystem}
                  errorText={errors[index]?.gradingSystem}
                  select
                >
                  {percentage.map((percent) => (
                    <MenuItem key={percent.value} value={percent.value}>
                      {percent.label}
                    </MenuItem>
                  ))}
                </InputBoxComponent>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputBoxComponent
                  className="education-form-input-box"
                  textLabel={_DegreePercentageTextlabel_}
                  required={true}
                  type="text"
                  value={degreePercentage}
                  name="degreePercentage"
                  onChange={(event) => handleValueChange(index, event)}
                  errors={!!errors[index]?.degreePercentage}
                  errorText={errors[index]?.degreePercentage}
                />
              </Grid>
            </>
          )
        )}
      </Grid>

      <Grid
        item
        className="w-90p d-flex justify-content-start ps-4 flex-column"
      >
        <CheckBoxComponent
          name="earlierBacklogs"
          label={_EarliarBacklogsLabel_}
          checked={backlogs.earlierBacklogs}
          onChange={handleCheckBoxOne}
        />
        <CheckBoxComponent
          name="presentBacklogs"
          label={_PrsentBacklogsLabel_}
          checked={backlogs.presentBacklogs}
          onChange={handleCheckBoxTwo}
        />
      </Grid>
    </>
  );
};

export default Education;
