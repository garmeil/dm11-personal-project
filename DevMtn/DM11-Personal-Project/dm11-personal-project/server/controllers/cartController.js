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
  removeAllFromCart: (req, res, next) => {
    const { user } = req.session;
    const deleteId = req.params.id;
    user.cart = user.cart.filter(val => {
      return val.id != deleteId;
    });
    console.log(user.cart);
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
              .then(response2 =>
                req.app
                  .get("db")
                  .getOrderById(response[0].orderid)
                  .then(response3 => res.status(200).json(response3))
              )
              .catch(console.log);
          });
          console.log("Success", response[0].orderid);
          req.session.user.cart = [];
          req.session.user.total = 0;

          // res.status(200).json(response);
        })
        .catch(console.log);
    } else res.status(200).json("keloo");
  }
};
