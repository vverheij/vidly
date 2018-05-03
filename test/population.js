const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('connected'))
    .catch((err) => console.error('could not connect', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('author', authorSchema);

const courseSchema = new mongoose.Schema({
    name: String
});

const Course = mongoose.model('course', courseSchema);

async function createAuthor(name, bio, website) {
    const author = new Author({
        name, 
        bio, 
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name) {
    const course = new Course({
        name
    });
    const result = await course.save();
    console.log(result);
}

async function listCourses(){
    const courses = await Course.find();
    console.log(courses);
}
 
createAuthor('Mosh','udemy teacher','vidly.com');
