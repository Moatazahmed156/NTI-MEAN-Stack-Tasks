const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");

const addGrade = (id, studentName, subject, grade) => {

    const grades = readGrades();

    const exists = grades.find(student => student.id === id);

    if (exists) {
        console.log("Student ID already exists.");
        return;
    }

    grades.push({
        id,
        studentName,
        subject,
        grade
    });

    saveGrades(grades);

    console.log("Grade added successfully.");

};

module.exports = addGrade;