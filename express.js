const express = require("express");
const app = express();

let arrBook = [{
    id: 1,
    name: "sariWeimberger!!!!!",
    price: 80
},
{
    id: 2,
    name: "riki",
    price: 100
},
{
    id: 3,
    name: "reizy",
    price: 200
}];

let arrLibarians = [
    {
        id: 1,
        name: "shalom"
    },
    {
        id: 2,
        name: "beni"
    },
]

app.use(express.json());
app.get("/book", (req, res) => {
    res.json(arrBook);
});

app.get("/book/:id", (req, res) => {
    let id = req.params.id;
    let book = arrBook.find(item => item.id == id);
    if (!book)
        res.status(404).send("הספר לא נמצא");
    res.json(book)
})
app.delete("/book/:id", (req, res) => {
    let id = req.params.id;
    let ind = arrBook.findIndex(item => item.id == id);
    if (ind == -1)
        res.status(404).send("הספר לא נמצא");
    let bookDelete=arrBook.splice(ind,1)[0];
    res.json(bookDelete).send("הספר נמחק בהצלחה");
})
app.post("/book",(req,res)=>{
    req.body.id=arrBook[arrBook.length-1].id+1;
    arrBook.push(req.body)
    res.status(201).json(req.body);
    
});
app.put("/book/:id",(req,res)=>{
    let id=req.params.id;
    let book=arrBook.find(item=>item.id==id);
    if(!book)
        res.status(404).send("לא נמצא ספר כזה")
    book.name=req.body.name||book.name;
    book.price=req.body.price||book.price;

    let indBook=arrBook.findIndex(item=>item.id==id);
    arrBook[indBook]=book
    res.json(book)
})


app.get("/libarians", (req, res) => {
    res.json(arrLibarians);
});


app.listen(8000, "localhost", () =>{ console.log("run on port 8000")})


