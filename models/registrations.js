const fs = require('fs');
const path = require('path');

const registrationsFilePath = path.join(__dirname, '../data/registrations.json');

function getAllRegistrations() {
    const data = fs.readFileSync(registrationsFilePath, 'utf8');
    return JSON.parse(data);
}

function saveRegistration(registrationData) {
    const registrations = getAllRegistrations();
    registrations.push(registrationData);
    fs.writeFileSync(registrationsFilePath, JSON.stringify(registrations, null, 2));
}

module.exports = {
    getAllRegistrations,
    saveRegistration
};
