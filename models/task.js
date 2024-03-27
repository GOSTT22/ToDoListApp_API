const mongoose = require('mongoose');
const Task = mongoose.model('Task', { 
    task_name: String,
    status: String
});

module.exports = Task;
