const UserModel = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { user_name, lastname, email, password,active_status,role } = req.body;
    const avatar=req.file? req.file.filename : null;
    console.log(avatar);
    const user = new UserModel({
      user_name,
      lastname,
      email,
      password,
      active_status,
      role,
      avatar
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLisUsers = async(req,res)=>{
    try{
      console.log("listausuarios");
      const users = await UserModel.find()
      res.status(200).json(users);
    }
    catch(error){
      console.log(error.message);
      res.status(400).json({message : error.message})
    }
  };

const getById= async(req,res)=>{
    try{
        console.log('consultar usuario por id')
        const {id} = req.params;
        const user = await UserModel.findById(id);
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const editUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const { user_name, lastname, email, password } = req.body;
        const user = await UserModel.findByIdAndUpdate(
            id,
            {user_name, lastname,email,password},
            {new: true}
        );
        console.log(user);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const deleteUser = async (req,res) => {
    try {
        const {id} = req.params;
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({message: "User delete"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = { createUser, getLisUsers , getById , editUser , deleteUser};