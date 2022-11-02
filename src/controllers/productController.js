const express = require("express");
const Product = require("../models/productModel");
const { handleErrors } = require("../utils/productErrors");

exports.createProduct = async (request, response) => {
  try {
    const { productName, description, price, image } = request.body;
    const newProduct = new Product({ productName, description, price, image });
    await newProduct.save();
    return response.status(201).send({
      status: true,
      message: "Product has been created",
      data: newProduct,
    });
  } catch (err) {
    const error = handleErrors(err);
    return response.status(400).json({ error });
  }
};

exports.updateProduct = async (request, response) => {
  const id = request.params.id;
  const findProduct = await Product.findById(id);
  findProduct.productName = request.body.productName;
  findProduct.description = request.body.description;
  findProduct.price = request.body.price;
  await findProduct.save();
  return response.status(200).send({
    status: true,
    message: "Product has been updated successfully",
    data: findProduct,
  });
};

exports.getOneProduct = async (request, response) => {
  try {
    const id = request.params.id;
    const findOneProduct = await Product.findById(id);

    if (!findOneProduct) {
      return response.status(404).send({
        status: false,
        message: "Product not found",
      });
    } else {
      return response.status(200).send({
        status: true,
        message: "Product found",
        Blog: findOneProduct,
      });
    }
  } catch (err) {
    if (err.path === "_id") {
      return response.status(401).send({
        status: false,
        message: "Invalid ID",
      });
    } else {
      return response.status(500).send({
        status: false,
        message: "Server Error",
      });
    }
  }
};

exports.getAllProduct = async (request, response) => {
  const findAllProduct = await Product.find();
  return response.status(200).send({
    status: true,
    message: "All Products",
    data: findAllProduct,
  });
};

exports.deleteProduct = async (request, response) => {
  const id = request.params.id;
  const findProduct = await Product.findByIdAndDelete(id);
  if (findProduct) {
    return response.status(200).send({
      status: true,
      message: "Product deleted successfully",
    });
  } else {
    return response.status(409).send({
      status: false,
      message: "Product not found",
    });
  }
};
