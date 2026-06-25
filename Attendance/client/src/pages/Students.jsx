import { useState } from 'react';

export default function Students({ students, onAdd, onUpdate, onDelete }) {
  const [newStudentId, setNewStudentId] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  return (
    <div className="page-content">
      <div className="card">
        <h2>Student Management</h2>
        <div className="student-form">
          <input
            placeholder="Student ID"
            value={newStudentId}
            onChange={(e) => setNewStudentId(e.target.value)}
          />
          <input
            placeholder="Student Name"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
          />
          <button type="button" onClick={() => { onAdd(newStudentId.trim(), newStudentName.trim()); setNewStudentId(''); setNewStudentName(''); }}>
            Add Student
          </button>
        </div>

        <div className="student-table-wrap">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>
                    {editingId === student.id ? (
                      <input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    ) : (
                      student.name
                    )}
                  </td>
                  <td>
                    {editingId === student.id ? (
                      <>
                        <button type="button" onClick={() => { onUpdate(student.id, editingName.trim()); setEditingId(null); setEditingName(''); }}>
                          Save
                        </button>
                        <button type="button" onClick={() => { setEditingId(null); setEditingName(''); }}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="button" onClick={() => { setEditingId(student.id); setEditingName(student.name); }}>
                          Edit
                        </button>
                        <button type="button" onClick={() => onDelete(student.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
