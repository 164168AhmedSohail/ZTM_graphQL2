const productsModel = require("./products.model");

module.exports = {
  Query: {
    products: () => {
      return productsModel.getAllProducts();
    },
    productsByPrice: (_, args) => {
      return productsModel.getProductsByPrice(args.min, args.max);
    },
    product: (_, args) => {
      return productsModel.getProductById(args.id);
    },
  },
  Mutation: {
    addNewProduct: (_, args, { pubsub }) => {
      pubsub.publish("NEW_COMMENT", {
        newComment: {
          id: args.id,
          description: args.description,
          price: args.price,
        },
      });
      return productsModel.addNewProduct(args.id, args.description, args.price);
    },
    addNewProductReview: (_, args) => {
      return productsModel.addNewProductReview(
        args.id,
        args.rating,
        args.comment
      );
    },
  },
  Subscription: {
    newComment: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_COMMENT"),
    },
  },
};
