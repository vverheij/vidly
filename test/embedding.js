const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('connected'))
    .catch((err) => console.error('could not connect', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

//embedded document
const courseSchema = new mongoose.Schema({
    name: String,
    //author: authorSchema
    author: {
        type: authorSchema,
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);

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
 
// async function updateAuthor(courseId) {
//     const course = await Course.findById(courseId);
//     course.author.name = 'Mosh Hamedani';
//     course.save();
// }

//update directly in database
// async function updateAuthor(courseId) {
//     const course = await Course.update({_id: courseId}, {
//         $set: {
//             'author.name': 'John Smith'
//         }
//     });
// }

// remove embedded property or document
async function updateAuthor(courseId) {
    const course = await Course.update({_id: courseId}, {
        $unset: {
            //'author.name': ''
            'author': ''
        }
    });
}

//createCourse('Node Course',new Author({name: 'Mosh'}))
updateAuthor('5aeee18b3e946c1c0c2eed91');
//listCourses();
