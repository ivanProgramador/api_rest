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

app.post('/game',(req,res)=>{
     
    var {id,title,year,price} = req.body;

       DB.games.push({
           id:2020,
           title,
           year,
           price
       });

    res.sendStatus(200);
})

app.delete('/game/:id',(req,res)=>{

     if(isNaN(req.params.id)){
        res.sendStatus(400);
     }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }

     }
});

app.put('/game/:id',(req,res)=>{

    if(isNaN(req.params.id)){
        res.statusCode(400)
    }else{

        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if(game != undefined){

             var {title,price,year} = req.body;
            
                if(title != undefined){
                
                    game.title = title;
                }

                if(year != undefined){
                
                    game.year = year;
                }

                if(game.price != undefined){
                
                    game.price = price;
                }

                res.sendStatus(200);
        }else{
             
            res.sendStatus(404);
        }

    }

});




app.listen(8000,()=>{
    console.log('api online');
})