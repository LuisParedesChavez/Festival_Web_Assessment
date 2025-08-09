const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'festival.db'), (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the festival database.');
});

// Define the route for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Define route for the lineup page
app.get('/lineup', (req, res) => {
  const year = req.query.year || 2024; // Default to 2024 if no year is selected
  const sql = 'SELECT * FROM lineup WHERE year = ?';
  db.all(sql, [year], (err, rows) => {
    if (err) {
      console.error('Error fetching lineup data:', err.message);
      return res.status(500).send('Internal Server Error');
    }
    res.render('lineup', { lineup: rows, year: year });
  });
});

// Define routes for other pages
app.get('/rock', (req, res) => {
  res.render('rock');
});

app.get('/pop', (req, res) => {
  res.render('pop');
});

app.get('/techno', (req, res) => {
  res.render('techno');
});

app.get('/faq', (req, res) => {
  res.render('faq');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.run(sql, [name, email, message], (err) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/');
  });
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.get(sql, [email, password], (err, row) => {
    if (err) {
      console.error('Error fetching user:', err.message);
      return res.status(500).send('Internal Server Error');
    }

    if (row) {
      res.send('<p>Login successful!</p><a href="/">Go to Home</a>');
    } else {
      res.send('<p>Invalid email or password. Please try again.</p><a href="/login">Back to Login</a>');
    }
  });
});

// Handle sign-up form submission
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';

  db.run(sql, [email, password], (err) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.send('<p>Email already exists. Please log in.</p><a href="/login">Back to Login</a>');
      }
      console.error('Error inserting user:', err.message);
      return res.status(500).send('Internal Server Error');
    }
    res.send('<p>Sign up successful! Please log in.</p><a href="/login">Back to Login</a>');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
