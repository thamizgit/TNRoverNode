const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const addUser = async (req,res) => {
    try{
        if(!req?.body?.user || !req?.body?.pwd){
            res.status(404).json({"message":"Username and Password required"});
        }
        const username = req.body.user;
        
        const duplicate = await Users.findOne({username}).exec();

        if(duplicate){
            res.status(409).json({"message":"Username already taken"});
        }

        const hashedPwd = await bcrypt.hash(req.body.pwd,10);

        const password = hashedPwd;

        const user = await Users.create({username,password});

        console.log(user);

        res.status(200).json({"message":"user successfully created"});

    }
    catch(err){
        res.status(500).json({"message":err});
    }
}

module.exports = addUser;