const User = require("../entities/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET_KEY = process.env.BCRYPT_KEY;

//Criando usuário
const createUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso. ", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro no servidor. ", error: error.message });
  }
};

//Fazendo login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
    const passValid = await bcrypt.compare(password, user.password);
    if (!passValid) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login bem-sucedido. ", token: token });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor. ", error: error });
  }
};

//Atualizando usuário
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { newFirstName, newLastName, newEmail, newPassword } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (newFirstName) {
      user.firstName = newFirstName;
    }
    if (newLastName) {
      user.lastName = newLastName;
    }
    if (newEmail) {
      user.email = newEmail;
    }
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }
    await user.save();

    res.status(200).json({ message: "Usuário atualizado.", user: user });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor. ", error: error });
  }
};

//Deletando usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).json({ message: "Usuário não encontrado." });
  }

  try {
    const userDelete = await User.destroy({ where: { id: id } });
    res.status(200).json({ message: "Usuário deletado.", user: userDelete });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor. ", error: error });
  }
};

module.exports = {
  createUser,
  updateUser,
  userLogin,
  deleteUser,
};
