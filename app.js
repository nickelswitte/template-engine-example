
import express from 'express';
import * as eta from "eta"
import fs from "fs";
import MarkdownIt from 'markdown-it';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var md = new MarkdownIt();


const app = express();
const port = 80;


// Enable render engine
app.engine("eta", eta.renderFile);
app.set("view engine", "eta");
app.set('views', './views');


app.use(express.json());
app.use(express.static('node_modules/bulma/css'));
app.use(express.static('public'));
// Include static files of bulma 


// Serve the index page
app.get('/', (req, res) => {
    res.render("index", {
        title: "This is the title",
        subtitle: "This is the subtitle"
    })
})

let data = {
    title: "Find here some images",
    subtitle: "They are just for you",
    people: [
        {
            name: "John Taylor",
            twitter: "jtee03",
            description: "Wafer caramels danish bonbon. Cheesecake cookie sugar plum. I love ice cream pastry.",
            imagelink: "https://i.imgur.com/2F3Al82.jpeg"
        },
        {
            name: "Doreen Johnson",
            twitter: "dorydance-xt",
            description: "Cotton candy biscuit tootsie roll chupa chups I love jujubes lollipop. Dessert cheesecake I love I love tart chocolate cake brownie",
            imagelink: "https://i.imgur.com/aUhpEz3.jpeg"
        },
        {
            name: "Freerk Jennsen",
            twitter: "freerk",
            description: "Lorem Ipsum Bla Blop",
            imagelink: "https://i.imgur.com/QdOTqIR.jpeg"
        },
        {
            name: "Milli Gerogia",
            twitter: "septemberagain",
            description: "Cupcake ipsum dolor sit amet tiramisu. Tiramisu tiramisu muffin. Liquorice chocolate cake bear claw sweet apple pie I love halvah tart. Toffee marshmallow croissant powder. Wafer caramels danish bonbon. Cheesecake cookie sugar plum. I love ice cream pastry. Cotton candy biscuit tootsie roll chupa chups I love jujubes lollipop. Dessert cheesecake I love I love tart chocolate cake brownie.",
            imagelink: "https://i.imgur.com/sBM9y7a.png"
        },
        {
            name: "Lülli Widde",
            twitter: "vanilly",
            description: "Cupcake ipsum dolor sit amet tiramisu. Tiramisu tiramisu muffin. Liquorice chocolate cake bear claw sweet apple pie I love halvah tart. Toffee marshmallow croissant powder. Wafer caramels danish bonbon. Cheesecake cookie sugar plum.",
            imagelink: "https://i.imgur.com/iEMP5I6.jpeg"
        },
    ]
}


app.get('/i', (req, res) => {
    res.render("images", data)
})

// Serve the index page
app.get('/m/:path', (req, res) => {

    let pathToFile = __dirname + '\\public\\md\\' + req.params.path + '.md';

    console.log(pathToFile);
    

    fs.readFile(pathToFile, 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        let markdownParsed = md.render(data);

        // console.log(data)
        res.render("markdown", {
            markdown: markdownParsed,
            title: "Markdown Render",
            subtitle: "This is auto-generated from Markdown"
        });
    });
    
});



/**
 * 404 Handler
 */
app.use(function(req, res, next) {
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
        res.status(404).send('Sorry cant find that!');
        return;
    }
  
    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

/**
 * Start the server
 */
app.listen(port, () => {
  console.log('Example app listening at port' + port);
  // console.log("Paths variable is: " + keyUrlPairs)
})
