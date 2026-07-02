const addGrade = require("./modules/add.grade");
const deleteGrade = require("./modules/delete.grade");
const updateGrade = require("./modules/update.grade");
const readGrades = require("./modules/read.grades");

const command = process.argv[2];

switch (command) {

    case "add":

        addGrade(
            process.argv[3],
            process.argv[4],
            process.argv[5],
            Number(process.argv[6])
        );

        break;

    case "delete":

        deleteGrade(process.argv[3]);

        break;

    case "update":

        updateGrade(
            process.argv[3],
            Number(process.argv[4])
        );

        break;

    case "read":

        console.table(readGrades());

        break;

    default:

        console.log(`
Available Commands:

node main.js add id "Name" "Subject" grade

node main.js read

node main.js update id newGrade

node main.js delete id
`);

}