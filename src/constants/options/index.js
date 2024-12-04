import en from "../../../messages/en.json";
const {
  _SpecializationsLabel_: {
    _AiMl_,
    _SoftwareEngineering_,
    _AutomotiveEngineering_,
  },
  _BranchesLabel_: { _BbaMba_, _ChemicalEngineering_, _It_ },
  _GradingLabel_: { _Percentage_, _Cgpa_ },
} = en;

export const specializationOptions = [
  { value: "ai_ml",label: _AiMl_},
  { value: "software_engineering", label: _SoftwareEngineering_ },
  { value: "automotive_engineering", label: _AutomotiveEngineering_ },
];

export const branches = [
  { value: "bba_mba", label: _BbaMba_ },
  { value: "chemical_engineering", label: _ChemicalEngineering_ },
  { value: "it", label: _It_ },
];

export const percentage = [
  {value: "percentage",label: _Percentage_},
  {value: "cgpa", label: _Cgpa_},
];
