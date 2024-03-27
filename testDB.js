const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');
mongoose.connect('mongodb+srv://anatoliygostichev:UZjGk8ZyFxrSzSny@cluster0.rmjjy2g.mongodb.net/todo');
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));