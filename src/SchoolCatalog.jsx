import { useState, useEffect } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState({})

  // Fetch from courses.json
  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch('/api/courses.json');
      if (response.ok) {
        try {
          const coursesData = await response.json()
          setCourses(coursesData);
        } catch (error) {
          console.log('Error fetching courses: ', error);
        }
      } else {
        console.log('Response not ok: ', response);
      }
    }
    getCourses();
  }, [])

  // Delete later. This is just to see what courses is
  useEffect(() => {
    console.log('Courses set: ', courses);
  }, [courses])

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {courses && Object.keys(courses).map((key, index) => {
            return (
              <tr key={index}>
                <td>{courses[key].trimester}</td>
                <td>{courses[key].courseNumber}</td>
                <td>{courses[key].courseName}</td>
                <td>{courses[key].semesterCredits}</td>
                <td>{courses[key].totalClockHours}</td>
                <td>
                  <button>Enroll</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
