const fs = require("fs");

const readGrades = () => {
    try {
        const data = fs.readFileSync("./data/grades.json", "utf8");

        if (!data) {
            return [];
        }

        return JSON.parse(data);

    } catch (err) {
        return [];
    }
};

module.exports = readGrades;