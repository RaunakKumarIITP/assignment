document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tableBody = document.querySelector('#studentTable tbody');

    let students = JSON.parse(localStorage.getItem('students')) || [];

    function validateInputs(name, id, email, contact) {
        const nameRegex = /^[A-Za-z\s]+$/;
        const idRegex = /^\d+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^\d{10,}$/;

        return (
            nameRegex.test(name) &&
            idRegex.test(id) &&
            emailRegex.test(email) &&
            contactRegex.test(contact)
        );
    }

    function saveToLocalStorage() {
        localStorage.setItem('students', JSON.stringify(students));
    }

    function renderTable() {
        tableBody.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('studentName').value.trim();
        const id = document.getElementById('studentId').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();

        if (!validateInputs(name, id, email, contact)) {
            alert('Please enter valid inputs.');
            return;
        }

        students.push({ name, id, email, contact });
        saveToLocalStorage();
        renderTable();
        form.reset();
    });

    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentId').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;

        students.splice(index, 1);
        saveToLocalStorage();
        renderTable();
    };

    window.deleteStudent = (index) => {
        if (confirm('Are you sure you want to delete this student?')) {
            students.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        }
    };

    renderTable();
});
