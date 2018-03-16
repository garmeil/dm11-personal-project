module.exports = (req, res, next) => {
  if (!req.session.user) {
    req.session.user = {
      id: 0,
      fullName: "",
      cart: [],
      total: 0
    };
  }
  next();
};
