const path = require('path');
const process = require('process');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const Token = require('../model/Token');

class SiteController {

  home(req, res) {
    res.sendFile(path.join(process.cwd(), 'src/build', 'index.html'));
  }

  async register(req, res) {
    const data = req.body;
    if (!data) {
      res.json({ status: 0 });
    } else {
      if (!data.username || !data.password) {
        res.json({ status: 0 });
      } else {
        const user = await User.findOne({
          attributes: ['username'],
          where: {
            username: data.username
          }
        });
        if (user) {
          res.json({ status: 0 });
        } else {
          bcrypt.hash(data.password, parseInt(process.env.SALT_ROUND), async (err, hash) => {
            await User.create({
              username: data.username,
              password: hash,
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              role: data.role
            });
            res.json({ status : 1 });
          });
        }
      }
    }
  }

  async refresh(req, res) {
    const refreshToken = req.body.token;
    const tokens = await Token.findAll({
      attributes: ['refreshToken']
    });
    const refreshTokens = tokens.map((token) => {
      return token.refreshToken;
    });
    if (!refreshToken) {
      res.json({status: 0});
    } else if (!(refreshTokens.includes(refreshToken))) {
      res.json({status: 0});
    } else {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) {
          res.json({ status: 0 });
        } else {
          const accessToken = jwt.sign({ username: data.username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30m'
          });
          res.json({ accessToken });
        }
      });
    }
  }

  async login(req, res) {
    const data = req.body;
    if (!data) {
      res.json({ status: 0 });
    } else {
      if (!data.username || !data.password) {
        res.json({ status: 0 });
      } else {
        try {
          const user = await User.findOne({
            where: {username: data.username}
          });
          if (!user) {
            res.json({ status : 0 });
          } else {
            if (await bcrypt.compare(data.password, user.password)) {
              const accessToken = jwt.sign({username: data.username}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30m'
              });
              const refreshToken = jwt.sign({username: data.username}, process.env.REFRESH_TOKEN_SECRET);
              await Token.create({refreshToken : refreshToken});
              res.json({ status : 1, accessToken, refreshToken});
              return;
            }
            res.json({ status : 0 });
          }
        } catch(err) {
          res.json({ status: 0 });
        }
      }
    }
  }

  async logout(req, res) {
    const refreshToken = req.body.token;
    await Token.destroy({
      where: {
        refreshToken: refreshToken
      }
    });
    res.json({ status: 1 });
  }

  async test(req, res) {
    const date1 = new Date();
    const date2 = new Date(2021, 11, 28, 20 ,0, 0);
    console.log(date2, date1,date2 - date1);
    res.json({status: 1});
  }
}

module.exports = new SiteController;