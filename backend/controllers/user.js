const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const dotenv = require("dotenv");
dotenv.config();
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const BCRYPT_CYCLE = process.env.BCRYPT_CYCLE;

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

function generateId() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}

exports.signup = (req, res, next) => {
  const emailUserInput = req.body.email;
  // regex email
  if (!emailRegex.test(emailUserInput)) {
    return res
      .status(401)
      .json({ message: "Paire identifiant/mot de passe incorrecte" });
  }
  bcrypt
    .hash(req.body.password, parseInt(BCRYPT_CYCLE)) // encrypting the password
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        keyRef: generateId(),
      });
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "Utilisateur crée !" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                currentUser: user,
                keyRef: user.keyRef,
                token: jwt.sign(
                  {
                    userId: user._id,
                    keyRef: user.keyRef,
                    isAdmin: user.isAdmin,
                  },
                  AUTH_TOKEN,
                  {
                    expiresIn: "24h",
                  }
                ),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.profile = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifyUser = (req, res, next) => {
  const dataUser = req.file
    ? {
        ...req.body.dataUser,
        position: req.body.userPosition,
        profilePicture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        // coverPicture: `${req.protocol}://${req.get("host")}/images/${
        //   req.file.filename
        // }`,
      }
    : { ...req.body, position: req.body.userPosition };

  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id != req.auth.userId && !req.auth.isAdmin) {
        res.status(403).json({ message: "Not authorized" });
      } else {
        User.updateOne(
          { _id: req.params.id },
          { ...dataUser, _id: req.params.id }
        )
          .then(() =>
            res.status(200).json({ message: "Updated successfully!" })
          )
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
