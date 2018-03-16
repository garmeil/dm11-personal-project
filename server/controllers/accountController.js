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
        res.status(200).send(req.user);
      })
      .catch(console.log);
  }
};