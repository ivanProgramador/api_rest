const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var DB = {
    games:[
        {
            id:23,
            title:"Call of Duty",
            year:2019,
            price: 60
        },
        {
            id:65,
            title:"Sea of Thieves",
            year:2018,
            price: 40
        },
        {
            id:2,
            title:"Minecraft",
            year:2012,
            price: 20
        }
    ]
}

//rota para listar todos os jogos 
app.get("/games",(req,res)=>{
    res.statusCode = 200; 
    res.json(DB.games);
});


app.get('/game/:id',(req,res)=>{
    
    if(isNaN(req.params.id)){

        res.sendStatus(400);

    }else{

        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){

            res.statusCode = 200;

            res.json(game);

        }else{

            res.sendStatus(404);

        }
    }
})



app.listen(8000,()=>{
    console.log('api online');
})