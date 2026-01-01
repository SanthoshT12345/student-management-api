const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let students = [];

// This for hosting 
app.get('/', (req, res) => {
    res.send('Student Management API is running');
});

// This is for fetching data from the base so far entered
app.get('/students', (req, res) => {
    res.json(students);
});

//To insert the data one by one
app.post('/students', (req, res) => {
    const { name, age, dept } = req.body;

    const newStudent = {
        id: students.length + 1,
        name,
        age,
        dept
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});


// Using student ID to upadate the data
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age, dept } = req.body;

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    student.name = name;
    student.age = age;
    student.dept = dept;

    res.json(student);
});

// This is for Update the data using name of the data
app.put('/students/name/:name', (req, res) => {
    const nameParam = req.params.name.toLowerCase();
    const { name, age, dept } = req.body;

    const student = students.find(
        s => s.name.toLowerCase() === nameParam
    );

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    student.name = name;
    student.age = age;
    student.dept = dept;

    res.json(student);
});

// delete the data using ID
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: 'Student deleted successfully',
        deletedStudent
    });
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
