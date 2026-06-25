const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function fetchStudents() {
  const res = await fetch(`${API_BASE}/api/students`);
  return res.json();
}

export async function fetchAttendance() {
  const res = await fetch(`${API_BASE}/api/attendance`);
  return res.json();
}

export async function saveAttendance(date, statusById) {
  const res = await fetch(`${API_BASE}/api/attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, statusById })
  });
  return res.json();
}

export async function addStudent(id, name) {
  const res = await fetch(`${API_BASE}/api/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name })
  });
  return res.json();
}

export async function updateStudent(id, name) {
  const res = await fetch(`${API_BASE}/api/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return res.json();
}

export async function deleteStudent(id) {
  const res = await fetch(`${API_BASE}/api/students/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}
