import React from "react";

import Card from "../UI/Card/Card";
import TopTitle from "../UI/TopTitle/TopTitle";
import { ReactComponent as DeleteIcon } from "../../Assets/Image/delete-icon.svg";
import "./jobTypeLists.css";

const JobType = (props) => {
  return (
    <Card className="job-type-lists">
      <TopTitle>Job Type</TopTitle>
      <table>
        <thead>
          <tr>
            <th className="user-lists__number">№</th>
            <th className="user-lists__group">Label</th>
            <th className="user-lists__delete"></th>
          </tr>
        </thead>
        <tbody>
          {props.jobs.map((item) => {
            return (
              <tr key={item.id}>
                <td className="user-lists__number">{item.id}</td>
                <td className="user-lists__group">{item.label}</td>
                <td
                  className="user-lists__delete"
                  onClick={() => {
                    console.log("delete job", item?.id);
                    props.deleteJob(item?.id);
                  }}
                >
                  <DeleteIcon />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default JobType;
