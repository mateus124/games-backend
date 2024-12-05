const Product = require("../entities/product");

//Criando um produto
const createProduct = async (req, res) => {
  const { name, price, description, category, image } = req.body;
  try {
    const newProduct = await Product.create({
      name: name,
      price: price,
      description: description,
      category: category,
      image: image,
    });

    res
      .status(201)
      .json({ message: "Produto criado com sucesso. ", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro no servidor. ", error: error.message });
  }
};

//Atualizando produto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { newName, newPrice, newDescription, newCategory, newImage } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    if (newName) {
      product.name = newName;
    }
    if (newPrice) {
      product.price = newPrice;
    }
    if (newDescription) {
      product.description = newDescription;
    }
    if (newCategory) {
      product.category = newCategory;
    }
    if (newImage) {
      product.image = newImage;
    }
    await product.save();

    res.status(200).json({ message: "Produto atualizado.", product: product });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor. ", error: error });
  }
};

//Deletando usuário
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({ message: "Produto não encontrado." });
  }

  try {
    const productDelete = await Product.destroy({ where: { id: id } });
    res.status(200).json({ message: "Produto deletado." });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor. ", error: error });
  }
};

//listar todos os produtos
const allProducts = async (req, res) => {
  try {
    const list = await Product.findAll();
    if (!list) {
      res.status(404).json({ message: "Não possui nenhum produto. " });
    }
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor. ", error: error });
  }
};

//listar apenas um produto
const oneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: "O produto não encontrado." });
    }
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor. ", error: error });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  allProducts,
  oneProduct,
};
