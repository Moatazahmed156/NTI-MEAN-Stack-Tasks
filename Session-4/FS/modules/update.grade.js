const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");

const updateGrade = (id, newGrade) => {

    const grades = readGrades();

    const student = grades.find(student => student.id === id);

    if (!student) {
        console.log("Student not found.");
        return;
    }

    student.grade = newGrade;

    saveGrades(grades);

    console.log("Grade updated successfully.");

};

module.exports = updateGrade;