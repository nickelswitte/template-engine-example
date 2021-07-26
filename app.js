
import express from 'express';
// Node File Interaction
import fs from 'fs';
import * as eta from "eta"

const app = express();
const port = 80;


// Enable render engine
app.engine("eta", eta.renderFile);
app.set("view engine", "eta");
app.set('views', './views');


app.use(express.json());
app.use(express.static('public'));
// Include static files of bulma 
app.use(express.static('node_modules/bulma/css'));


// Serve the index page
app.get('/', (req, res) => {
    res.render("index")
})


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
