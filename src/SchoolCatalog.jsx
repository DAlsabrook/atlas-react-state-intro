import { useState, useEffect } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState({})
  const [displayedCourses, setDisplayedCourses] = useState({})
  const [searchValue, setSearchValue] = useState('')
  const [directionFlag, setDirectionFlag] = useState({
    'trimester': 0,
    'courseNumber': 0,
    'courseName': 0,
    'semesterCredits': 0,
    'totalClockHours': 0,
  });

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
      return;
    }
    let newDisplayedCourses = []
    // find all name that contain the value
    Object.keys(courses).map((key) => {
      const name = courses[key].courseName.toLowerCase();
      const number = courses[key].courseNumber.toLowerCase();
      if (number.includes(searchValue.toLowerCase()) || name.includes(searchValue.toLowerCase())) {
        newDisplayedCourses.push(courses[key]);
      }
    });
    setDisplayedCourses(newDisplayedCourses);
  }, [searchValue])

  const handleHeaderFilter = (headerName) => {
    const sortedCourses = [...Object.values(displayedCourses)].sort((a, b) => {
      const aValue = a[headerName].toString();
      const bValue = b[headerName].toString();
      if (directionFlag[headerName]) {
        return bValue.localeCompare(aValue);
      } else {
        return aValue.localeCompare(bValue);
      }
    });
    setDirectionFlag((prevFlag) => ({
      ...prevFlag,
      [headerName]: prevFlag[headerName] ? 0 : 1,
    }));
    setDisplayedCourses(sortedCourses);
  }

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleHeaderFilter('trimester')} style={{cursor: 'pointer'}}>Trimester</th>
            <th onClick={() => handleHeaderFilter('courseNumber')} style={{cursor: 'pointer'}}>Course Number</th>
            <th onClick={() => handleHeaderFilter('courseName')} style={{cursor: 'pointer'}}>Courses Name</th>
            <th onClick={() => handleHeaderFilter('semesterCredits')} style={{cursor: 'pointer'}}>Semester Credits</th>
            <th onClick={() => handleHeaderFilter('totalClockHours')} style={{cursor: 'pointer'}}>Total Clock Hours</th>
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
