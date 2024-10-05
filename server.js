const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Import the fs module

const app = express();
const PORT = 3000;

let logs = [];

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/log', (req, res) => {
    const { action, timestamp } = req.body;
    logs.push({ action, timestamp });
    res.json({ message: 'Event logged successfully' });
});

// Function to write logs to a file
function writeLogsToFile() {
    if (logs.length > 0) {
        // Prepare the log data
        const logData = JSON.stringify(logs, null, 2); // Convert to JSON string
        fs.writeFileSync(path.join(__dirname, 'log.json'), logData, { flag: 'a' }); // Append to log.json
        console.log('Logs written to log.json');
        logs = []; // Clear logs after writing
    }
}

setInterval(writeLogsToFile, 120000); // Write logs every 2 minutes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
