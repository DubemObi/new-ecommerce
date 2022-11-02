const express = require("express");
const User = require("../models/userModel");
const { handleErrors } = require("../utils/error");

exports.updateUser = async (request, response) => {
  try {
    const id = request.params.id;
    const user = request.user;
    if (user.id !== id) {
      return response.status(401).json({ mesaage: "Unauthorized user" });
    }
    const newFullname = request.body.fullname;
    const newEmail = request.body.email;
    const update = {
      fullname: newFullname,
      email: newEmail,
    };
    const updatedUser = await User.findByIdAndUpdate(id, update);
    return response.status(200).send({
      status: true,
      message: "Account has been updated successfully",
      updatedUser: updatedUser,
    });
  } catch (err) {
    const error = handleErrors(err);
    response.status(404).json({ error });
  }
};

exports.getUser = async (request, response) => {
  try {
    const id = request.params.id;
    const user = request.user;
    if (user.id !== id) {
      response.status(401).json({ mesaage: "Unauthorized user" });
    }
    const findOneUser = await User.findById(id);

    if (!findOneUser) {
      return response.status(404).send({
        status: false,
        message: "User not found",
      });
    } else {
      return response.status(200).send({
        status: true,
        message: "User found",
        User: findOneUser,
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

exports.getAllUsers = async (request, response) => {
  try {
    const findAllUsers = await User.find();
    return response.status(200).send({
      status: true,
      message: "Users found",
      AllUsers: findAllUsers,
    });
  } catch (err) {
    console.log(err);
    return response.status(404).send({
      status: false,
      message: "No users found",
    });
  }
};

exports.deleteUser = async (request, response) => {
  const id = request.params.id;
  const user = request.user;
  if (user.id !== id) {
    if (user.role !== "admin")
      return response.status(401).json({ mesaage: "Unauthorized user" });
  }
  const findUser = await User.findByIdAndDelete(id);
  if (findUser) {
    response.status(200).send({
      status: true,
      message: "User deleted successfully",
      deletedUser: findUser,
    });
  } else {
    response.status(404).send({
      status: false,
      message: "User not found",
    });
  }
};
