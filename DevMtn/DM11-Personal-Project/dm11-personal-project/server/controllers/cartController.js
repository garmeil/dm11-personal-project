module.exports = {
  addToCart: (req, res, next) => {
    req.app
      .get("db")
      .getProductById(req.params.id)
      .then(response => {
        req.session.user.cart.push(response[0]);
        req.session.user.total += response[0].price;
        res.status(200).send(req.session.user);
      });
  },
  readFromCart: (req, res, next) => {
    res.status(200).send(req.session.user);
  },
  deleteFromCart: (req, res, next) => {
    const { user } = req.session;
    const deleteId = req.params.id;
    const deleteIndex = user.cart.findIndex(val => val.id == deleteId);
    if (deleteIndex == -1) return res.status(500).send(user);
    const deletePrice = user.cart[deleteIndex].price;
    req.session.user.cart.splice(deleteIndex, 1);
    req.session.user.total -= deletePrice;
    req.app.get("db").getProductById(req.params.id);
    res.status(200).send(req.session.user);
  },
  checkOut: (req, res, next) => {
    console.log(req.user);
    if (req.user && req.session.user.cart.length > 0) {
      req.app
        .get("db")
        .createOrder([req.user.id])
        .then(response => {
          req.session.user.cart.forEach((val, index) => {
            req.app
              .get("db")
              .createOrderItem([response[0].orderid, val.id])
              .catch(console.log);
          });
          console.log("Success");
          req.session.user.cart = [];
          req.session.user.total = 0;
          res.status(200).json(req.session.user);
        })
        .catch(console.log);
    } else res.status(200).json("keloo");
  },
  clearCart: (req, res, next) => {
    if (req.session.user) {
      req.session.user.cart = [];
      req.session.user.total = 0;
      res.status(200).send(req.session.user);
    } else {
      res.status(500).send("No req.session.user exists");
    }
  }
};
