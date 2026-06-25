import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Nav from './components/Nav';
import Home from './pages/Home';
import AttendancePage from './pages/AttendancePage';
import Students from './pages/Students';
import Report from './pages/Report';
import {
  fetchStudents,
  fetchAttendance,
  saveAttendance as apiSaveAttendance,
  addStudent as apiAddStudent,
  updateStudent as apiUpdateStudent,
  deleteStudent as apiDeleteStudent
} from './api/attendanceApi';
import { PERIODS } from './data/constants';

function App() {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [studentStatuses, setStudentStatuses] = useState({});
  const [loading, setLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      fetchData();
    }
  }, [loggedIn]);

  useEffect(() => {
    const record = attendanceRecords.find((item) => item.date === selectedDate);
    setStudentStatuses(record?.statusById || {});
  }, [selectedDate, attendanceRecords]);

  async function fetchData() {
    setLoading(true);
    try {
      const [studentsData, attendanceData] = await Promise.all([
        fetchStudents(),
        fetchAttendance()
      ]);
      setStudents(studentsData || []);
      setAttendanceRecords(attendanceData.attendance || []);
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(admin) {
    setIsAdmin(admin);
    setLoggedIn(true);
    navigate('/');
  }

  function handleLogout() {
    setLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
  }

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function handleStatusChange(studentId, periodKey, status) {
    setStudentStatuses((current) => ({
      ...current,
      [studentId]: {
        ...current[studentId],
        [periodKey]: status
      }
    }));
  }

  async function handleSaveAttendance() {
    const statusById = students.reduce((acc, student) => {
      const studentStatus = studentStatuses[student.id] || {};
      const normalized = { ...studentStatus };
      PERIODS.forEach((_, index) => {
        const key = `period${index + 1}`;
        normalized[key] = normalized[key] || 'absent';
      });
      acc[student.id] = normalized;
      return acc;
    }, {});

    const response = await apiSaveAttendance(selectedDate, statusById);
    if (response?.attendance) {
      setAttendanceRecords(response.attendance);
      setStudentStatuses(statusById);
      alert('Attendance saved successfully.');
      return;
    }

    alert('Unable to save attendance.');
  }

  async function handleAddStudent(id, name) {
    const result = await apiAddStudent(id, name);
    if (result?.error) {
      alert(result.error);
      return;
    }
    setStudents(result);
  }

  async function handleUpdateStudent(id, name) {
    const result = await apiUpdateStudent(id, name);
    if (result?.error) {
      alert(result.error);
      return;
    }
    setStudents(result);
  }

  async function handleDeleteStudent(id) {
    const result = await apiDeleteStudent(id);
    if (result?.error) {
      alert(result.error);
      return;
    }
    setStudents(result);
    setStudentStatuses((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function RequireAuth({ children }) {
    return loggedIn ? children : <Navigate to="/login" replace />;
  }

  function AdminRoute({ children }) {
    if (!loggedIn) {
      return <Navigate to="/login" replace />;
    }
    return isAdmin ? children : <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="app">
        <div className="card">
          <p>Loading attendance data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {loggedIn && (
        <>
          <header className="app-header">
            <h1>Attendance Management</h1>
            <p>Track student attendance across 5 periods with admin controls.</p>
          </header>
          <Nav isAdmin={isAdmin} onLogout={handleLogout} />
        </>
      )}
      <Routes>
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home
                students={students}
                selectedDate={selectedDate}
                attendanceRecords={attendanceRecords}
                onDateChange={handleDateChange}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/report"
          element={
            <RequireAuth>
              <Report
                students={students}
                selectedDate={selectedDate}
                attendanceRecords={attendanceRecords}
                onDateChange={handleDateChange}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/attendance"
          element={
            <AdminRoute>
              <AttendancePage
                students={students}
                selectedDate={selectedDate}
                studentStatuses={studentStatuses}
                onDateChange={handleDateChange}
                onStatusChange={handleStatusChange}
                onSaveAttendance={handleSaveAttendance}
              />
            </AdminRoute>
          }
        />
        <Route
          path="/students"
          element={
            <AdminRoute>
              <Students
                students={students}
                onAdd={handleAddStudent}
                onUpdate={handleUpdateStudent}
                onDelete={handleDeleteStudent}
              />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to={loggedIn ? '/' : '/login'} replace />} />
      </Routes>
    </div>
  );
}

export default App;
