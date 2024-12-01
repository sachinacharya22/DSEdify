import React from "react";
import { Grid, MenuItem } from "@mui/material";
import AddBtnIcon from "@/assets/icons/Frame.png";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonComponent from "@/components/atoms/Buttoncomponent/page";
import CheckBoxComponent from "@/components/atoms/CheckBoxComponent/page";
import InputBoxComponent from "@/components/atoms/InputBoxComponent/page";
import Image from "next/image";

const Education = ({
  degrees,
  setDegrees,
  backlogs,
  handleValueChange,
  handleCheckBoxOne,
  handleCheckBoxTwo,
  errors,
  validateFields,
}) => {
  const specializationOptions = [
    {
      value: "ai_ml",
      label: "Artificial Intelligence & Machine Learning (AI/ML)",
    },
    { value: "software_engineering", label: "Software Engineering" },
    { value: "automotive_engineering", label: "Automotive Engineering" },
    { value: "iot", label: "Internet of Things (IoT)" },
    { value: "web_development", label: "Web Development and Design" },
    { value: "environmental_technology", label: "Environmental Technology" },
    { value: "hrm", label: "Human Resource Management (HRM)" },
  ];

  const branch = [
    { value: "bba_mba", label: "Business Administration (BBA/MBA)" },
    { value: "chemical_engineering", label: "Chemical Engineering" },
    { value: "it", label: "Information Technology" },
    { value: "ece", label: "Electronics and Communication Engineering (ECE)" },
    { value: "me", label: "Mechanical Engineering (ME)" },
    { value: "cse", label: "Computer Science and Engineering (CSE)" },
  ];

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
      },
      ...degrees,
    ]);
  };

  const handleRemoveDegree = (id) => {
    if (degrees.length > 1) {
      setDegrees((prevDegree) =>
        prevDegree.filter((degree) => degree.id !== id)
      );
    }
  };

  return (
    <>
      <Grid
        item
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
        sx={{ width: "90%" }}
      >
        <ButtonComponent
          label="Add Degree"
          showIcon={true}
          icon={
            <Image
              src={AddBtnIcon}
              alt="add btn icon"
              style={{ width: 25, height: "auto" }}
            />
          }
          onBtnClick={handleAddDegree}
          sx={{
            color: "#203763",
            background: "none",
            fontSize: 15,
            fontWeight: 700,
            ":hover": {
              backgroundColor: "inherit",
              color: "inherit",
            },
          }}
        />
      </Grid>

      <Grid
        container
        className="scroll-container"
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"baseline"}
        sx={{
          maxWidth: "90%",
          margin: "0 auto",
          overflowY: "auto",
          padding: "8px",
        }}
      >
        {degrees.map((degree, index) => (
          <>
            {degrees.length > 1 && (
              <Grid
                item
                display={"flex"}
                justifyContent={"end"}
                borderBottom={"2px dashed #203763"}
                sx={{ width: "100%" }}
              >
                <ButtonComponent
                  label="Remove Degree"
                  showIcon={true}
                  icon={<DeleteIcon style={{ color: "red" }} />}
                  onBtnClick={() => {
                    handleRemoveDegree(degree.id);
                  }}
                  sx={{
                    color: "#203763",
                    background: "none",
                    fontSize: 15,
                    fontWeight: 700,
                    ":hover": {
                      backgroundColor: "inherit",
                      color: "inherit",
                    },
                  }}
                />
              </Grid>
            )}
            <Grid item key={index} md={6} xs={12}>
              <InputBoxComponent
                textLabel="Degree Specialization"
                required={true}
                type="text"
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
                name="degreeSpecialization"
                value={degree.degreeSpecialization}
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
                textLabel="Branch"
                required={true}
                type="text"
                sx={{ width: "100%", backgroundColor: "white" }}
                value={degree.branch}
                name="branch"
                onChange={(event) => handleValueChange(index, event)}
                errors={!!errors[index]?.branch}
                errorText={errors[index]?.branch}
                select
              >
                {branch.map((option) => (
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
                textLabel="Grading System"
                required={true}
                type="text"
                sx={{ width: "100%", backgroundColor: "white" }}
                value={degree.gradingSystem}
                name="gradingSystem"
                onChange={(event) => handleValueChange(index, event)}
                errors={!!errors[index]?.gradingSystem}
                errorText={errors[index]?.gradingSystem}
                select
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="cgpa">CGPA</MenuItem>
              </InputBoxComponent>
            </Grid>
            <Grid item md={6} xs={12}>
              <InputBoxComponent
                textLabel="Degree Percentage"
                required={true}
                type="text"
                sx={{ width: "100%", backgroundColor: "white" }}
                value={degree.degreePercentage}
                name="degreePercentage"
                onChange={(event) => handleValueChange(index, event)}
                errors={!!errors[index]?.degreePercentage}
                errorText={errors[index]?.degreePercentage}
              />
            </Grid>
          </>
        ))}
      </Grid>

      <Grid
        item
        width={"90%"}
        display={"flex"}
        justifyContent={"start"}
        flexDirection={"column"}
        paddingLeft={3}
      >
        <CheckBoxComponent
          name="earlierBacklogs"
          label="Any Earlier Backlogs"
          checked={backlogs.earlierBacklogs}
          onChange={handleCheckBoxOne}
        />
        <CheckBoxComponent
          name="presentBacklogs"
          label="Any Present Backlogs"
          checked={backlogs.presentBacklogs}
          onChange={handleCheckBoxTwo}
        />
      </Grid>
    </>
  );
};

export default Education;
