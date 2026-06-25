import { PERIODS } from '../data/constants';

export default function Report({ students, selectedDate, attendanceRecords, onDateChange }) {
  const record = attendanceRecords.find((item) => item.date === selectedDate);

  return (
    <div className="page-content">
      <div className="card">
        <h2>Attendance Report</h2>
        <p>View the selected date across all five periods.</p>
        <label htmlFor="report-date">Date</label>
        <input
          id="report-date"
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
        />

        <div className="report-table-wrap">
          <table className="attendance-table report-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                {PERIODS.map((period) => (
                  <th key={period}>{period}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const studentPeriods = record?.statusById?.[student.id] || {};
                return (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    {PERIODS.map((_, periodIndex) => (
                      <td key={`${student.id}-${periodIndex}`}>
                        {studentPeriods[`period${periodIndex + 1}`] || 'absent'}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
