const fs = require('fs');
const path = require('path');

const registrationsFilePath = path.join(__dirname, '..', 'data', 'registrations.json');

function getAllRegistrations() {
    try {
        const data = fs.readFileSync(registrationsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading registrations file:', err);
        return [];
    }
}

function saveRegistration(registrationData) {
    try {
        const registrations = getAllRegistrations();
        registrations.push(registrationData);
        fs.writeFileSync(registrationsFilePath, JSON.stringify(registrations, null, 2));
        console.log('Registration saved successfully.');
    } catch (err) {
        console.error('Error saving registration:', err);
    }
}

module.exports = {
    getAllRegistrations,
    saveRegistration
};
