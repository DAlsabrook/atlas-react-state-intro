import { useState, useEffect } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState({})
  const [displayedCourses, setDisplayedCourses] = useState({})
  const [searchValue, setSearchValue] = useState('')

  // Fetch from courses.json
  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch('/api/courses.json');
      if (response.ok) {
        try {
          const coursesData = await response.json()
          setCourses(coursesData);
          setDisplayedCourses(coursesData);
        } catch (error) {
          console.log('Error fetching courses: ', error);
        }
      } else {
        console.log('Response not ok: ', response);
      }
    }
    getCourses();
  }, [])

  // Watch the search value
  useEffect(() => {
    setDisplayedCourses({});
    if (searchValue === '' || searchValue === null) {
      setDisplayedCourses(courses);
      console.log('search value null or empty');
      return;
    }
    let newDisplayedCourses = []
    // find all name that contain the value
    Object.keys(courses).map((key) => {
      const name = courses[key].courseName.toLowerCase();
      if (searchValue && name.includes(searchValue.toLowerCase())) {
        newDisplayedCourses.push(courses[key]);
      }
    });
    setDisplayedCourses(newDisplayedCourses);
  }, [searchValue])

  // Delete later. Just ot watch what is going on.
  // useEffect(() => {
  //   console.log(searchValue)
  //   console.log('displayedCourses set: ', displayedCourses);
  // }, [displayedCourses])

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
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
          {displayedCourses && Object.keys(displayedCourses).map((key, index) => {
            return (
              <tr key={index}>
                <td>{displayedCourses[key].trimester}</td>
                <td>{displayedCourses[key].courseNumber}</td>
                <td>{displayedCourses[key].courseName}</td>
                <td>{displayedCourses[key].semesterCredits}</td>
                <td>{displayedCourses[key].totalClockHours}</td>
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
