function hospitalTriage(patients) {
    let treatedImmediately = [];
    let normalPatients = [];
    let missingDataList = [];

    for (let i = 0; i < patients.length; i++) {
        let patient = patients[i];
        if (!patient.hasData) {
            missingDataList.push(patient);
            continue;
        }
        if (patient.condition === "critical") {
            treatedImmediately.push(patient);
        } else {
            normalPatients.push(patient);
        }
    }

    for (let i = 0; i < normalPatients.length - 1; i++) {
        for (let j = 0; j < normalPatients.length - 1 - i; j++) {
            if (normalPatients[j].severity < normalPatients[j + 1].severity) {
                let temp = normalPatients[j];
                normalPatients[j] = normalPatients[j + 1];
                normalPatients[j + 1] = temp;
            }
        }
    }

    return {
        treatedImmediately,
        normalTreated: normalPatients,
        missingDataList
    };
}

let patients = [
    { name: "Ali", severity: 3, hasData: true, condition: "normal" },
    { name: "Ziad", severity: 5, hasData: true, condition: "critical" },
    { name: "Omar", severity: 4, hasData: false, condition: "normal" },
    { name: "Mohamed", severity: 5, hasData: true, condition: "normal" },
    { name: "Ahmed", severity: 2, hasData: true, condition: "normal" }
];

console.log(hospitalTriage(patients));
