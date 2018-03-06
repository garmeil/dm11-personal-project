function getProducts(req, res, next) {
  req.app
    .get("db")
    .getProducts()
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(console.log);
}
function getProductsByCategory(req, res, next) {
  req.app
    .get("db")
    .getProductsByCategory(req.params.category)
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(console.log);
}
module.exports = { getProducts, getProductsByCategory };
