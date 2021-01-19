const mongoose = require('mongoose');

const url = 'bugaosuni'; // 猜猜这是什么
const options = {
    user: 'bugaosuni',
    pass: 'bugaosuni',
    useNewUrlParser: true
}
mongoose.connect(url, options);

const db = mongoose.connection;

db.on('error', () => {
    console.log('error');
});

db.once('open', () => {
    console.log('success');
})

const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    globalID: String,
    adjunctTopics: Array,
    instructionalDiagrams: Array,
    lessonName: String,
    topics: Array,
    questions: Object
})

const lessonModel = mongoose.model('tqa-data', LessonSchema, 'tqa-data');


const getLessonList = (function () {
    let lessonList = [];
    function init() {
        return new Promise((resolve, reject) => {
            lessonModel.find({}, { globalID: 1, lessonName: 1, _id: 0 }, (err, docs) => {
                if (err) {
                    reject(err);
                    return;
                }
                docs.sort((a, b) => a.lessonName.localeCompare(b.lessonName));
                resolve(docs);
            })
        })
    };

    return async function () {
        if (lessonList.length === 0) {
            lessonList = await init();
            return lessonList;
        } else {
            return lessonList;
        }
    }
})();


const getLessonData = (lessonID) => {
    return new Promise((resolve, reject) => {
        lessonModel.findOne({
            globalID: lessonID
        }, {
            topics: 1,
            questions: 1,
            _id: 0
        }, (err, doc) => {
            console.log(err);
            console.log(doc);
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })
}


exports.getLessonList = getLessonList;
exports.getLessonData = getLessonData;