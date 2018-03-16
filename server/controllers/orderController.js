module.exports = {
  getOrders: (req, res, next) => {
    req.app
      .get("db")
      .getOrders()
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  },
  getOrderById: (req, res, next) => {
    req.app
      .get("db")
      .getOrderById(req.params.id)
      .then(response => res.status(200).send(response))
      .catch(console.log);
  },
  getOrderByUser: (req, res, next) => {
    if (req.params.id) {
      req.app
        .get("db")
        .getOrderByUser(req.params.id)
        .then(response => {
          console.log(req.params.id);
          res.status(200).send(response);
        })
        .catch(console.log);
    } else {
      res.status(500).send(console.log("No User From Request"));
    }
  }
};
