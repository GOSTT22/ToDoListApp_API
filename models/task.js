const mongoose = require('mongoose');
const { Schema, Document } = require('mongoose');
const Task = mongoose.model('Task', { 
    authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, // Ссылка на модель 'User'
    task_name: String,
    description: String,
    status: String,
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = Task;
