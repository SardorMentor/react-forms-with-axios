import React from "react";

import Card from "../UI/Card/Card";
import TopTitle from "../UI/TopTitle/TopTitle";
import { ReactComponent as DeleteIcon } from "../../Assets/Image/delete-icon.svg";
import "./userLists.css";

const UserList = (props) => {
  return (
    <Card className="user-lists">
      <TopTitle>User Lists</TopTitle>
      <table>
        <thead>
          <tr>
            <th className="user-lists__number">№</th>
            <th className="user-lists__group">Full name</th>
            <th className="user-lists__group">Date of birth</th>
            <th className="user-lists__group">Phone</th>
            <th className="user-lists__email">Email</th>
            <th className="user-lists__company-name">Company Name</th>
            <th className="user-lists__group">Job Type</th>
            <th className="user-lists__experience">Experience</th>
            <th className="user-lists__delete"></th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((item) => {
            return (
              <tr key={item.uuid}>
                <td className="user-lists__number">{item.uuid}</td>
                <td className="user-lists__group">{`${item.user_infos.firstName} ${item.user_infos.lastName}`}</td>
                <td className="user-lists__group">{item.user_infos.dob}</td>
                <td className="user-lists__group">
                  {item.user_infos.phone_number}
                </td>
                <td className="user-lists__email">{item.user_infos.email}</td>
                <td className="user-lists__company-name">
                  {item.work_area.company_name}
                </td>
                <td className="user-lists__group">{item.work_area.job_type}</td>
                <td className="user-lists__experience">
                  {item.work_area.experience}
                </td>
                <td
                  className="user-lists__delete"
                  onClick={() => {
                    console.log("delete user", item?.uuid);
                    props.deleteUser(item?.uuid);
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

export default UserList;
