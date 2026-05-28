require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ====================================================
// 🔌 STEP 2: DATABASE CONNECTION SETUP
// ====================================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));


// ====================================================
// 📊 STEP 3: SCHEMA & MODEL CREATION (Relationships)
// ====================================================

// Subtask 3.1: Create User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// Subtask 3.2: Create Task Schema with ObjectId Reference
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  // 🔗 The reference linking the Task back to a specific User document
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);


// ====================================================
// 🛠️ STEP 4: BASIC CRUD & RELATIONSHIP OPERATIONS
// ====================================================

// Subtask 4.1: Seed Data / Create User Route
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Subtask 4.1: Create Task Route linked to a specific User ID
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    
    // Verify the targeted User exists first before binding data
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(442).json({ error: "Cannot create task: User ID does not exist." });
    }

    const newTask = new Task({ title, description, userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Subtask 4.2 & 4.3: Fetch Tasks and Populate Relational Reference Data
app.get('/tasks', async (req, res) => {
  try {
    // .populate('userId') injects the corresponding user object directly into the task payload
    const tasks = await Task.find().populate('userId', 'name email');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start Server Loop
app.listen(PORT, () => {
  console.log(`🚀 Data Modeling engine listening on port ${PORT}`);
});