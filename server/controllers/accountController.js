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
        req.app.get("db").getUserById(req.user.id).then(response => {
          req.user = response
          res.status(200).send(req.user);
        })
      })
      .catch(console.log);
  },
  deleteUser: (req, res, next) => {
    req.app
      .get("db")
      .deleteUser(req.params.id)
      .then(response => {
        req.session.destroy(() => {
          res.redirect(`${process.env.REDIRECT_URIS}`)
        });
  }
};
