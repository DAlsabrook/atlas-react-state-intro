import { UserCoursesContext } from './courseContext'
import { useContext } from 'react';

export default function ClassSchedule() {
  const { dropCourse, userCourses } = useContext(UserCoursesContext)
  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {userCourses && Object.keys(userCourses).map((key, index) => {
            return (
              <tr key={index}>
                <td>{userCourses[key].courseNumber}</td>
                <td>{userCourses[key].courseName}</td>
                <td>
                  <button onClick={() => dropCourse(userCourses[key].courseNumber)}>Drop</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
