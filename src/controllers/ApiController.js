const mongoose = require('mongoose');
const User = require('../models/user');
const { SwitchPage } = require('./Functions/SwitchPage');

module.exports = class LoginApiController {
  static LandingPages(req, res) {
    if (!req.body.user || !req.body.password) {
      res
        .status(406)
        .json({ message: 'Without User or Password', code: 'WHP1' });
    } else {
      User.findOne({ user: req.body.user }, (error, user) => {
        if (error) {
          res
            .status(500)
            .json({ message: 'Internal Server Error!', code: 'ISE1' });
        } else if (user) {
          if (req.body.password === user.password) {
            let page = SwitchPage(user.pageSelected);
            res
              .status(200)
              .json({ message: 'Success', code: 'LRS1', page: page });
          } else {
            res.status(401).json({ message: 'Wrong Password', code: 'WPU1' });
          }
        } else {
          res.status(406).json({ message: 'User not Found', code: 'UNF1' });
        }
      });
    }
  }
};
