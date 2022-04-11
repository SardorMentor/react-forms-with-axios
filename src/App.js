import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "./components/UI/Card/Card";
import Button from "./components/UI/Button/Button";
import TopTitle from "./components/UI/TopTitle/TopTitle";
import FormInput from "./components/FormInput/FormInput";
import UserLists from "./components/UserLists/UserLists";
import JobTypeLists from "./components/JobTypeLists/JobTypeLists";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);


  const dataInitialValues = {
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    dob: "",
    companyName: "",
    experience: "",
    jobType: ""
  };

  const jobDataInitialValue = {
    label: ""
  }

  const [dataValues, setDataValues] = useState(dataInitialValues);
  const [jobDataValue, setJobDataValue] = useState(jobDataInitialValue);

  const inputs = [
    {
      name: "name",
      type: "text",
      errorMessage: "Name is required, must be at least 3 characters",
      label: "Name",
      value: dataValues.name,
      required: true,
      pattern: "^[a-zA-Z0-9]{3,}$",
      placeholder: "Enter your name",
    },
    {
      name: "surname",
      type: "text",
      errorMessage: "Surname is required, must be at least 3 characters",
      label: "Surname",
      value: dataValues.surname,
      required: true,
      pattern: "^[a-zA-Z0-9]{3,}$",
      placeholder: "Enter your surname",
    },
    {
      name: "phoneNumber",
      type: "number",
      errorMessage: "Phone number is required",
      label: "Phone Number",
      value: dataValues.phoneNumber,
      required: true,
      pattern: "^[0-9]$",
      placeholder: "Enter your phone number",
    },
    {
      name: "email",
      type: "email",
      errorMessage: "Email is required",
      label: "Email",
      value: dataValues.email,
      required: true,
      pattern:
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
      placeholder: "Enter your mail",
    },
    {
      name: "dob",
      type: "date",
      errorMessage: "Data of birth is required",
      label: "Date of birth",
      value: dataValues.dob,
      required: true,
    },
    {
      name: "companyName",
      type: "text",
      errorMessage: "Company name is required, must be at least 3 characters",
      label: "Company Name",
      value: dataValues.companyName,
      required: true,
      pattern: "^[a-zA-Z0-9]{3,}$",
      placeholder: "Enter your company name",
    },
  ];

  const onChange = (event) => {
    setDataValues({ ...dataValues, [event.target.name]: event.target.value });
  };

  const jobAddChange = (event) => {
    setJobDataValue({[event.target.name]: "" + event.target.value });
  };

  const getUsers = () => {
    axios
      .get("https://624b0e2171e21eebbcec0e9d.mockapi.io/api/v1/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("error ", error));
  };

  useEffect(() => getUsers(), [])

  const deleteUser = (id) => {
    axios
      .delete(`https://624b0e2171e21eebbcec0e9d.mockapi.io/api/v1/users/${id}`)
      .then((response) =>  getUsers())
      .catch((error) => console.log(error));
  };

  const getJobs = () => {
    axios
      .get("https://624b0e2171e21eebbcec0e9d.mockapi.io/api/v1/types")
      .then((response) => setJobs(response.data))
      .catch((error) => console.log("error ", error));
  };

  useEffect(() => getJobs(), [])

  const deleteJob = (id) => {
    axios
      .delete(`https://624b0e2171e21eebbcec0e9d.mockapi.io/api/v1/types/${id}`)
      .then((response) =>  getJobs())
      .catch((error) => console.log(error));
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = {
      "user_infos": {
        "firstName": dataValues.name,
        "lastName": dataValues.surname,
        "email": dataValues.email,
        "phone_number": dataValues.phoneNumber,
        "dob": dataValues.dob
      },
      "work_area": {
        "company_name": dataValues.companyName,
        "job_type": dataValues.jobType,
        "experience": dataValues.experience
      }
    };
    console.log(formData);
    axios
      .post(
        "https://624b0e2171e21eebbcec0e9d.mockapi.io/api/v1/users",
        formData
      )
      .then((response) => {
        getUsers();
        setDataValues(dataInitialValues);
      });
  };

  const jobClickHandler = () => {
    axios
      .post(
        "https://624b0e2171e21eebbcec0e9d.mockapi.io/api/v1/types",
        jobDataValue
      )
      .then((response) => {
        console.log(response);
        getJobs();
      });
  };

  return (
    <main className="container">
      <Card className="form-container">
        <form>
          <Card className="users-info">
            <TopTitle>User's Info</TopTitle>
            <div className="users-info__container">
              {inputs.slice(0,5).map((input) => (
                <FormInput key={input.name} {...input} onChange={onChange} />
              ))}
            </div>
          </Card>
          <Card className="work-details">
            <TopTitle>Work Details</TopTitle>
            <div className="work-details__container">
              {inputs.slice(5,6).map((input) => (
                <FormInput key={input.name} {...input} onChange={onChange} />
              ))}
              <div className="work-details__form-select__container">
                <div className="inoutHolder">
                  <label className="form-label">Job Type</label>
                  <select className="form-select" onChange={onChange} name="jobType">
                    <option value="">Select your jop type</option>
                    {jobs.map((item) => (
                      <option key={item.id} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="inoutHolder">
                  <label className="form-label">Experience</label>
                  <select className="form-select" onChange={onChange} name="experience">
                    <option value="">Select your experience</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
          <Card className="job-type">
            <TopTitle>Job Type</TopTitle>
            <div className="job-type__container">
              <FormInput
                name="label"
                label="Label"
                type="text"
                placeholder="Enter your job type"
                onChange={jobAddChange}
              />
              <div className="job-type__buttons">
                <Button className="cancelBtn">Отменить</Button>
                <Button className="saveBtn" onClick={jobClickHandler}>
                  Сохранить
                </Button>
              </div>
            </div>
          </Card>
          <div className="forms-buttons">
            <Button className="cancelBtn">Отменить</Button>
            <Button className="saveBtn" type="sumbit" onClick={submitHandler}>
              Сохранить
            </Button>
          </div>
        </form>
      </Card>
      <UserLists users={users} deleteUser={deleteUser} />
      <JobTypeLists jobs={jobs} deleteJob={deleteJob} />
    </main>
  );
};

export default App;
