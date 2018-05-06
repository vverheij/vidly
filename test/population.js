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
    name: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'author'
        } 
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

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });
    const result = await course.save();
    console.log(result);
}

async function listCourses(){
    const courses = await Course
    .find()
    .populate('author','name -_id')
    .select('name author');
    console.log(courses);
}
 
//createAuthor('Mosh','My Bio','My Website');
//createCourse('Node Course','5aeec9505732710f1ce46712')
listCourses();


