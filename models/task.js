const mongoose = require('mongoose');
const Task = mongoose.model('Task', { 
    task_name: String,
    
    description: String,
    status: String,
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = Task;
