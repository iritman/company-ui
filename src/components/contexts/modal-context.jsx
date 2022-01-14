import { useState, createContext, useContext } from "react";

const ModalContext = createContext();

const useModalContext = () => useContext(ModalContext);

const ModalContextProvider = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});
  const [memberSearchProgress, setMemberSearchProgress] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [members, setMembers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [securityGuards, setSecurityGuards] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceID, setSelectedProvinceID] = useState(0);
  const [cities, setCities] = useState([]);
  const [companySearchProgress, setCompanySearchProgress] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [dutyLevels, setDutyLevels] = useState([]);
  const [workShifts, setWorkShifts] = useState([]);
  const [monthes, setMonthes] = useState([]);
  const [years, setYears] = useState([]);
  const [eduLevels, setEduLevels] = useState([]);
  const [eduFields, setEduFields] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [employmentStatuses, setEmploymentStatuses] = useState([]);
  const [workPlaces, setWorkPlaces] = useState([]);
  const [regTypes, setRegTypes] = useState([]);
  const [fileList, setFileList] = useState({});

  const contextValue = {
    progress,
    setProgress,
    record,
    setRecord,
    errors,
    setErrors,
    memberSearchProgress,
    setMemberSearchProgress,
    departments,
    setDepartments,
    roles,
    setRoles,
    members,
    setMembers,
    employees,
    setEmployees,
    securityGuards,
    setSecurityGuards,
    provinces,
    setProvinces,
    selectedProvinceID,
    setSelectedProvinceID,
    cities,
    setCities,
    companySearchProgress,
    setCompanySearchProgress,
    companies,
    setCompanies,
    dutyLevels,
    setDutyLevels,
    workShifts,
    setWorkShifts,
    monthes,
    setMonthes,
    years,
    setYears,
    eduLevels,
    setEduLevels,
    eduFields,
    setEduFields,
    universities,
    setUniversities,
    employmentTypes,
    setEmploymentTypes,
    employmentStatuses,
    setEmploymentStatuses,
    workPlaces,
    setWorkPlaces,
    regTypes,
    setRegTypes,
    fileList,
    setFileList,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

const useResetContext = () => {
  const { setProgress, setRecord, setErrors } = useModalContext();

  const resetContext = () => {
    setProgress(false);
    setRecord({});
    setErrors({});
  };

  return resetContext;
};

export { ModalContextProvider, useModalContext, useResetContext };
