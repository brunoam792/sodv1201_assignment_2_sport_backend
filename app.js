const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'https://brunoam792.github.io'
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Path to the directory for storing registration files
const registrationsDir = './data';

// Create the registrations directory if it doesn't exist
if (!fs.existsSync(registrationsDir)) {
  fs.mkdirSync(registrationsDir);
}

// Controller
app.post('/register', (req, res) => {
  const { id, fullName, address, status } = req.body;

  // Calculate registration fee
  let fee = 0;
  if (status === 'student') {
    fee = 10;
  } else if (status === 'staff') {
    fee = 50;
  } else if (status === 'volunteer') {
    fee = 0;
  }

  // Save registration data to a new file
  const fileName = `${id}.json`;
  const filePath = path.join(registrationsDir, fileName);
  const registrationData = { id, fullName, address, status, fee };
  fs.writeFileSync(filePath, JSON.stringify(registrationData, null, 2));

  // Send confirmation message
  const confirmationMessage = `Registration received for ${fullName}. Fee: $${fee}`;
  res.json({ message: confirmationMessage, registrationData });
});

app.get('/form-html', (req, res) => {
  const formPath = path.join(__dirname, 'views', 'registration.html');
  fs.readFile(formPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading form HTML');
    } else {
      res.send(data);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
