const UserModel = require("../models/user");
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
  try {
    const { user_name, lastname, email, password, active_status, role } = req.body;
    const avatar = req.file ? req.file.filename : null;
    console.log(avatar);

    // Hashea la contraseña antes de guardar el usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      user_name,
      lastname,
      email,
      password: hashedPassword, // Guarda la contraseña hasheada
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
        console.log('consultar usuario')
        const {email} = req.body;
        const user = await UserModel.findById(email);
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const verify = async(req, res) => {
  try {
      console.log('consultar usuario')
      const { email, password } = req.body; 
      console.log(email,password);
      const user = await UserModel.findOne({ email: email }); 

      if (!user) {
          return res.status(400).json({ message: 'Usuario no encontrado' });
      }
      
      console.log('Verificando contraseña...');
      let isPasswordValid = false; // Define isPasswordValid aquí
      try {
        isPasswordValid = await bcrypt.compare(password, user.password); // Asigna un valor aquí
        console.log('Resultado de la verificación:', isPasswordValid);
      } catch (error) {
        console.error('Error al verificar la contraseña:', error);
      }
      
      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
      console.log("bien");
      res.status(200).json(user);
  } catch(error) {
      res.status(400).json({ message: error.message });
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

module.exports = { createUser, getLisUsers , verify, editUser , deleteUser, getById};