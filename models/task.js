const mongoose = require('mongoose');
const Task = mongoose.model('Task', { 
    task_name: String,
    description: String,
    status: String
});

module.exports = Task;
