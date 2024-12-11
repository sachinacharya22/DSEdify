import * as yup from "yup";
import validationRegex from "./utils/regexUtils";
import en from "../../messages/en.json";

const {
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

const {
  emailRegex,
  phoneNumberRegex,
  personNameRegex,
  seatNumberRegex,
  permanentCityRegex,
  percentageRegex,
  cgpaRegex,
} = validationRegex;

export const verficationValidateSchema = yup.object().shape({
  phNo: yup
    .string()
    .required(_FieldRequired_)
    .matches(phoneNumberRegex, _Numbers_),
  email: yup.string().required(_FieldRequired_).matches(emailRegex, _Email_),
});

export const studentInfoValidateSchema = yup.object().shape({
  fullName: yup
    .string()
    .required(_FieldRequired_)
    .matches(personNameRegex, _FullName_),
  whatsappNo: yup
    .string()
    .required(_FieldRequired_)
    .matches(phoneNumberRegex, _Numbers_),
  usn: yup.string().required(_FieldRequired_).matches(seatNumberRegex, _Usn_),
  permanentCity: yup
    .string()
    .required(_FieldRequired_)
    .matches(permanentCityRegex, _PermanentCity),
  tenthPercentage: yup
    .string()
    .required(_FieldRequired_)
    .matches(percentageRegex, _Percentage_),
  pucDiploma: yup
    .string()
    .required(_FieldRequired_)
    .matches(percentageRegex, _Percentage_),
  imageUpload: yup.mixed().required(_ImageRequired_),
});

export const validationSchema = yup.object().shape({
  degrees: yup.array().of(
    yup.object().shape({
      degreeSpecialization: yup.string().required(_FieldRequired_),
      degreeBranch: yup.string().required(_FieldRequired_),
      gradingSystem: yup
        .string()
        .required(_FieldRequired_)
        .oneOf(["percentage", "cgpa"], "Invalid grading system"),
      degreePercentage: yup
        .string()
        .required(_FieldRequired_)
        .when("gradingSystem", {
          is: "percentage",
          then: () =>
            yup
              .string()
              .required(_FieldRequired_)
              .matches(percentageRegex, _Percentage_)
              .nullable(),
          otherwise: () =>
            yup
              .string()
              .required(_FieldRequired_)
              .matches(cgpaRegex, _CGPA_)
              .nullable(),
        }),
    })
  ),
});
