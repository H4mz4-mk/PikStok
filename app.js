var express = require("express"),
    request = require("request"),
    app     = express();
    app.set("view engine" , "ejs");

app.get("/", function(req , res){
    var values      = ['university','flower','computer',
                        'Agriculture','commerce','commercial',
                        'energy','wallpapers','COVID-19','Travel',
                        'nature','events','business','technology',
                        'progeamming','food','industrial'],
        randomIndex = Math.floor(Math.random() * values.length),
        randomPic   = "https://api.unsplash.com/search/photos/?client_id=YOUR_API_KEY_HERE&query="+values[randomIndex];
    request(randomPic, function(error, response, body){
        if( response.statusCode === 200 ){
            var result = JSON.parse(body);
            if(result.Response === "False"){
                res.render("error");
            }
            res.render("search" , {result : result});
        }
    }); 
});

app.get("/results", function(req , res){
    var value = req.query.search;
    var url = "https://api.unsplash.com/search/photos/?client_id=YOUR_API_KEY_HERE&query=" + value;
    request(url, function(error, response, body){
        if( response.statusCode === 200 ){
            var data = JSON.parse(body);
            if(data.Response === "False"){
                res.render("error");
            }
            res.render("results" , {data : data});
        }
    });  
});

app.get('*', function(req, res){
    res.send('ERROR 404');
});

app.listen(3000, function(){
    console.log("server is ON, PORT 3000");
});