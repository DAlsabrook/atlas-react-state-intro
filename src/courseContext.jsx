import React, { createContext, useState } from 'react';

export const UserCoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [userCourses, setUserCourses] = useState([]);

  const enrollCourse = (course) => {
    setUserCourses((prevCourses) => [...prevCourses, course]);
  };

  const dropCourse = (courseNumber) => {
    setUserCourses((prevCourses) => prevCourses.filter(course => course.courseNumber !== courseNumber));
  };

  return (
    <UserCoursesContext.Provider value={{ userCourses, enrollCourse, dropCourse }}>
      {children}
    </UserCoursesContext.Provider>
  );
};
