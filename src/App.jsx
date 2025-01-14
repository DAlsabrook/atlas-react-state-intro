import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { CoursesProvider } from './courseContext'

export default function App() {
  return (
    <div>
      <CoursesProvider>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </CoursesProvider>
    </div>
  );
}
