module.exports = {
  updateUserInfo: (req, res, next) => {
    const { body } = req;
    req.app
      .get("db")
      .updateUserInfo(
        body.full_name,
        body.email,
        body.address,
        body.city,
        body.state,
        body.zipcode,
        req.user.id
      )
      .then(response => {
        let obj = response[0];
        console.log("OBJ, ", obj);
        req.session.passport.user = obj;
        res.status(200).send(response);
      })
      .catch(console.log);
  },
  deleteUser: (req, res, next) => {
    req.app
      .get("db")
      .deleteUser(req.params.id)
      .then(response => {
        req.user = {};
        req.session.destroy(() => {
          res.redirect(`${process.env.REDIRECT_URIS}`);
        });
      })
      .catch(err => console.log(err));
  },
  submitMessage: (req, res, next) => {
    const { body } = req;
    req.app
      .get("db")
      .submitMessage(body.full_name, body.email, body.message)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => console.log(err));
  }
};
