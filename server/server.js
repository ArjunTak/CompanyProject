const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const router = jsonServer.router("./userdetails.json");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
const userdetailsdb = JSON.parse(fs.readFileSync("./userdetails.json", "utf-8"));

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "6078797hhkj53dfv9";
const expiresIn = "1h";

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

function isAuthenticated({email, password}) {
    return (
        userdb.user.findIndex((user) => user.email === email && user.password === password
        ) !== -1
    );
}

function isDuplicate({name, age, phone, nationality }) {
    return (
        userdetailsdb.userdetails.findIndex((user) => user.name === name && user.age === age && user.phone === phone && user.nationality === nationality 
               ) !== -1
    );
}

function isDetailsNull({name, age, phone, nationality}){
    if(name==="" && age==="" && phone==="" && nationality==="" ){
        return true;
    }
} 

function isNull({email, password}){
    if(email==="" || password===""){
        return true;
    }
} 

// Logic for creating register API

server.post("/api/auth/register", (req, res) => {
    const {name, email, password} = req.body;
    if(isAuthenticated({email, password})) {
        const status = 401;
        const message = "Email already exists";
        res.status(status).json({status, message})
        return;
    }

    if(isNull({email, password})) {
        const status = 401;
        const message = "Enter valid email";
        res.status(status).json({status, message})
        return;
    }

    fs.readFile("./users.json", (err, data) => {
        if (err) {
            const status = 401;
            const message = "Email already exists";
            res.status(status).json({status, message})
            return;
        }
        data = JSON.parse(data.toString());
        let last_item_id = data.user[data.user.length - 1].id;

        data.user.push({id: last_item_id + 1, name: name, email: email, password: password });
        let writeData = fs.writeFile("./users.json",
        JSON.stringify(data),
        (err, result) => {
            if(err) {
                const status = 401;
                const message = "Email already exists";
                res.status(status).json({status, message});
                return;

            }
        }
        );
    });
    const access_token = createToken({email, password});
    res.status(200).json({ access_token });
});

// Logic for creating Login API

server.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if(!isAuthenticated({email, password})) {
        const status = 401;
        const message = "Incorrect Email or Password";
        res.status(status).json({status, message})
        return;
    }

    if(isNull({email, password})) {
        const status = 401;
        const message = "Enter valid email";
        res.status(status).json({status, message})
        return;
    }

    const access_token = createToken({email, password});
    res.status(200).json({ access_token });
});

//Logic for capturing Userdetalis  

server.post("/api/auth/capturedetails", (req,res) => {
    const { name, age, phone, nationality } = req.body;


    if(isDetailsNull({name, age, phone, nationality})) {
        const status = 401;
        const message = "Enter at least one field";
        res.status(status).json({status, message})
        return;
    }

    if(isDuplicate({name, age, phone, nationality})) {
        const status = 401;
        const message = "Details already exist";
        res.status(status).json({status, message})
        return;
    }

    fs.readFile("./userdetails.json", (err, data) => {

        if (err) {
            const status = 401;
            const message = "Email already exists";
            res.status(status).json({status, message})
            return;
        }

        data = JSON.parse(data.toString());
        let last_item_id = data.userdetails[data.userdetails.length - 1].id;
        data.userdetails.push({id: last_item_id + 1, name: name, age: age, phone: phone, nationality: nationality });
        let writeData = fs.writeFile("./userdetails.json",
        JSON.stringify(data),
        (err, result) => {
            if(err) {
                const status = 401;
                const message = "Details already exists";
                res.status(status).json({status, message});
                return;

            }
        }
        );
        
   }
)
});

console.log()

server.use(router);
server.listen(5000, () => {
    console.log("Running.....")
});