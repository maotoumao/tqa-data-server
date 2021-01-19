const express = require('express');
const router = express.Router();
const fs = require('fs');
const { getLessonList, getLessonData } = require('./db');


router.use((req, res, next) => {
    console.log('received request');
    next();
});

// router.get('/get-hot-templates', async (req, res) => {
//     const hotTemplates = await getHotTemplates();
//     res.status(200).json(hotTemplates);
// })

router.get('/get-lesson-list', async (req, res) => {
    try {
        const lessons = await getLessonList();
        res.status(200).json(lessons);
    } catch(e){
        res.status(500);
    }
});

router.get('/get-lesson-data', async (req, res) => {
    try {
        const {lessonKey} = req.query;
        const lessonData = await getLessonData(lessonKey);
        res.status(200).json(lessonData);
    } catch(e){
        res.status(500);
    }
})

router.get('/imgs/:type/:img', (req, res) => {
    const type = req.params.type;
    const img = req.params.img;
    const cs = fs.createReadStream(`./imgs/${type}/${img}`);
    cs.on('data', chunk => {
        res.write(chunk);
    });

    cs.on('end', () => {
        res.status(200).end();
    });
    cs.on('error', ()=>{
        res.status(500);
    })
})

module.exports = router;