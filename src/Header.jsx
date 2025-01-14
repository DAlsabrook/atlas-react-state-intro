import logo from "./assets/logo.png"
import React, { useContext } from 'react'
import { UserCoursesContext } from './courseContext'

export default function Header() {
  const { userCourses } = useContext(UserCoursesContext);

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {userCourses.length}</div>
    </div>
  );
}
