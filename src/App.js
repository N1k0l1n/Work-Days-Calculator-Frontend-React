import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [parsedUsers, setParsedUsers] = useState([]);

  const fetchData = async () => {
    const uri = "http://localhost:8081/users/list";
    const response = await axios.get(uri);

    if (response.data) {
      const users = response.data;
      const parsedUsers = [];
      users.forEach((user) => {
        let totalHours = 0;
        let extraHours = 0;
        user.workingDays.forEach((day) => {
          totalHours += day.hours;
          extraHours += day.hours % 8;
        });

        parsedUsers.push({
          name: user.name,
          surname: user.surname,
          payment: user.payment,
          normalHours: user.workingDays.length * 8,
          totalHours: totalHours,
          extraHours: extraHours,
        });
      });

      setParsedUsers(parsedUsers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Normal Working Hours</th>
            <th>Hours outside Working Hours </th>
            <th>Total Hours</th>
            <th>Total Payment</th>
          </tr>
        </thead>
        {parsedUsers.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.normalHours}</td>
            <td>{user.extraHours}</td>
            <td>{user.totalHours}</td>
            <td>{user.payment}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default App;
