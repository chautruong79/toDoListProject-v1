const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let newItems =['Buy Food','Cook Food','Eat Food'];
let workItems = [];
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let today = new Date();
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let day = today.toLocaleDateString("en-US", options);
    res.render('list', {listTitle: day, newItems: newItems});
});

app.post('/', (req, res) => {
    if (req.body.list === 'Work') {
        workItems.push(req.body.newItem);
        res.redirect('/work');
    } else {
        newItems.push(req.body.newItem);
        res.redirect('/');
    }
})

app.get('/work', (req,res) => {
    res.render('list', {listTitle: 'Work List', newItems: workItems});
});
app.get('/about', (req,res) => {
    res.render('about');
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
