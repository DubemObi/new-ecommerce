//Handling errors
exports.handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    productName: "",
    description: "",
    price: "",
    image: "",
  };

  //validate errors
  if (err.message.includes("Product validation failed"))
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });

  return errors;
};
