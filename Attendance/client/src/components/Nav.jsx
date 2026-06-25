import { Link } from 'react-router-dom';

export default function Nav({ isAdmin, onLogout }) {
  return (
    <nav className="app-nav">
      <Link to="/">Home</Link>
      <Link to="/report">Report</Link>
      {isAdmin && <Link to="/attendance">Mark Attendance</Link>}
      {isAdmin && <Link to="/students">Students</Link>}
      <button type="button" onClick={onLogout}>Logout</button>
    </nav>
  );
}
