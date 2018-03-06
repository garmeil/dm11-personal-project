module.exports = {
  getOrders: (req, res, next) => {
    req.app
      .get("db")
      .getOrders()
      .then(response => res.status(200).send(response))
      .catch(console.log);
  },
  getOrderById: (req, res, next) => {
    req.app
      .get("db")
      .getOrderById(req.params.id)
      .then(response => res.status(200).send(response))
      .catch(console.log);
  },
  getOrderByUser: (req, res, next) => {
    if (req.user.id) {
      req.app
        .get("db")
        .getOrderByUser(req.user.id)
        .then(response => res.status(200).send(reponse))
        .catch(console.log);
    } else {
      res.status(500).send(console.log("No User From Request"));
    }
  }
};
