const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyUser = async (req,res) => {
    try{
    if(!req.body.user || !req.body.pwd){
        res.status(404).json({"message":"Username or Password missing"});
    }
    const username = req.body.user;

    const user = await Users.findOne({username}).exec();

    if(!user){
        res.status(401).json({"message":"Incorrect username or password"});
    }
    const match = await bcrypt.compare(req.body.pwd,user.password);

    if(match){
        const accessToken = jwt.sign({Username: user.username},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '200s'});

        const refreshToken = jwt.sign({Username: user.username},process.env.REFRESH_TOKEN_SECRET,{expiresIn: '1d'});

        user.refreshToken = refreshToken;

        const result = await user.save();

        console.log(result);

        res.cookie('jwt',refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({username,accessToken});
    }
    }
    catch(err){
        res.status(500).json({"message":"Internal Server Error"});
    }

}
module.exports = verifyUser;