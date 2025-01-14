import { useState, useEffect, useContext } from "react";
import { UserCoursesContext } from './courseContext'

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
  const [paginationPage, setPaginationPage] = useState(1)
  const [disablePrev, setDisablePrev] = useState(true)
  const [disableNext, setDisableNext] = useState(false)
  const { enrollCourse } = useContext(UserCoursesContext)

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

  const itemsPerPage = 5;
  const startIndex = (paginationPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleNextPage = () => {
    const currentPage = paginationPage;
    if (disableNext) return
    setPaginationPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    if (disablePrev) return
    const currentPage = paginationPage;
    setPaginationPage(currentPage - 1)
  }

  useEffect(() => {
    if (paginationPage > 1) {
      setDisablePrev(false)
    } else setDisablePrev(true)

    if (displayedCourses[endIndex]) {
      setDisableNext(false)
    } else setDisableNext(true)
  }, [paginationPage, displayedCourses])

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
            {displayedCourses && Object.keys(displayedCourses).slice(startIndex, endIndex).map((key, index) => (
              <tr key={index}>
                <td>{displayedCourses[key].trimester}</td>
                <td>{displayedCourses[key].courseNumber}</td>
                <td>{displayedCourses[key].courseName}</td>
                <td>{displayedCourses[key].semesterCredits}</td>
                <td>{displayedCourses[key].totalClockHours}</td>
                <td>
                  <button onClick={() => enrollCourse(displayedCourses[key])}>Enroll</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={disablePrev}
          style={{ opacity: disablePrev ? '.8' : '1' }}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={disableNext}
          style={{ opacity: disableNext ? '.8' : '1' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
