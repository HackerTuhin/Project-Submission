const express = require('express');
const dotenv = require('dotenv');
const uuid = require('uuid');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [
  {
    id: uuid.v4(),
    username: 'Alice',
    age: 25,
    hobbies: ['Reading', 'Swimming'],
  },
  {
    id: uuid.v4(),
    username: 'Bob',
    age: 30,
    hobbies: ['Cooking', 'Gardening'],
  },
  {
    id: uuid.v4(),
    username: 'Charlie',
    age: 28,
    hobbies: ['Hiking', 'Painting'],
  },
  {
    id: uuid.v4(),
    username: 'David',
    age: 35,
    hobbies: ['Coding', 'Photography'],
  },
  {
    id: uuid.v4(),
    username: 'Eve',
    age: 22,
    hobbies: ['Dancing', 'Singing'],
  },
  {
    id: uuid.v4(),
    username: 'Frank',
    age: 40,
    hobbies: ['Traveling', 'Fishing'],
  },
  {
    id: uuid.v4(),
    username: 'Grace',
    age: 27,
    hobbies: ['Yoga', 'Meditation'],
  },
  {
    id: uuid.v4(),
    username: 'Henry',
    age: 32,
    hobbies: ['Gaming', 'Movies'],
  },
  {
    id: uuid.v4(),
    username: 'Ivy',
    age: 26,
    hobbies: ['Shopping', 'Blogging'],
  },
  {
    id: uuid.v4(),
    username: 'Jack',
    age: 29,
    hobbies: ['Running', 'Camping'],
  },
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/show_user/:userId', (req, res) => {
  const { userId } = req.params;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST create user
app.post('/api/create_user', (req, res) => {
  const { username, age, hobbies } = req.body;
  if (!username || !age) {
    return res.status(400).json({ error: 'Username and age are required' });
  }
  const newUser = {
    id: uuid.v4(),
    username,
    age,
    hobbies: hobbies || [],
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/api/update_user/:userId', (req, res) => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const updatedUser = {
    id: userId,
    username: username || users[userIndex].username,
    age: age || users[userIndex].age,
    hobbies: hobbies || users[userIndex].hobbies,
  };
  users[userIndex] = updatedUser;
  res.json(updatedUser);
});

// DELETE user
app.delete('/api/delete_user/:userId', (req, res) => {
  const { userId } = req.params;
  users = users.filter((u) => u.id !== userId);
  res.sendStatus(204);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
