const fs = require("fs");

const saveGrades = (grades) => {

    fs.writeFileSync(
        "./data/grades.json",
        JSON.stringify(grades, null, 2)
    );

};

module.exports = saveGrades;