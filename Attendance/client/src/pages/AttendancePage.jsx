import { useState } from 'react';
import { STATUS_OPTIONS, PERIODS } from '../data/constants';

export default function AttendancePage({ students, selectedDate, studentStatuses, onDateChange, onStatusChange, onSaveAttendance }) {
  const [selectedPeriod, setSelectedPeriod] = useState(PERIODS[0]);
  const periodKey = `period${PERIODS.indexOf(selectedPeriod) + 1}`;

  return (
    <div className="page-content">
      <div className="card">
        <h2>Mark Attendance</h2>
        <label htmlFor="attendance-date">Date</label>
        <input
          id="attendance-date"
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
        />
        <label htmlFor="attendance-period">Period</label>
        <select
          id="attendance-period"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          {PERIODS.map((period) => (
            <option key={period} value={period}>{period}</option>
          ))}
        </select>

        <div className="student-grid">
          {students.map((student) => (
            <div key={student.id} className="student-row">
              <span>{student.name} ({student.id})</span>
              <select
                value={studentStatuses[student.id]?.[periodKey] || 'absent'}
                onChange={(e) => onStatusChange(student.id, periodKey, e.target.value)}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button type="button" onClick={onSaveAttendance}>Save Attendance</button>
      </div>
    </div>
  );
}
