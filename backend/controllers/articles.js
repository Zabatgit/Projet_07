const Article = require("../models/Article");
const fs = require("fs");

exports.createArticle = (req, res, next) => {
  const article = new Article({
    ...req.body,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    keyRef: req.auth.keyRef,
  });
  article
    .save()
    .then(() => {
      res.status(201).json({ message: "Post saved successfully!" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.getAllArticles = (req, res, next) => {
  Article.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "keyRef",
        foreignField: "keyRef",
        as: "user",
      },
    },
  ])
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifyArticle = (req, res, next) => {
  const articleObject = req.file
    ? {
        ...req.body.article,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Article.findOne({ _id: req.params.id })
    .then((article) => {
      if (article.userId != req.auth.userId && !req.auth.isAdmin) {
        res.status(403).json({ message: "Not authorized" });
      } else {
        Article.updateOne(
          { _id: req.params.id },
          { ...articleObject, _id: req.params.id }
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

exports.deleteArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      if (article.userId != req.auth.userId && !req.auth.isAdmin) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = article.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Article.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(204).json({ message: "Deleted successfully!" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likeArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      if (!article.usersLiked.includes(req.auth.userId)) {
        Article.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.auth.userId },
          }
        )
          .then(() => {
            res.status(201).json({ message: "Post liked !" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
      if (article.usersLiked.includes(req.auth.userId)) {
        Article.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.auth.userId },
          }
        )
          .then(() => {
            res.status(200).json({ message: "Post unliked !" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.createComment = (req, res, next) => {
  const comment = {
    comment: req.body.newComment,
    userProfilePicture: req.body.currentUser.profilePicture,
    userName: req.body.currentUser.name,
    userLastName: req.body.currentUser.lastName,
    userKeyRef: req.body.currentUser.keyRef,
    creation: Date.now(),
  };
  Article.findOne({ _id: req.params.id })
    .then(() => {
      Article.updateOne(
        { _id: req.params.id },
        {
          $push: { comments: comment },
        }
      )
        .then(() => {
          res.status(201).json({ message: "Comment saved successfully!" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteComment = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      if (!req.auth.isAdmin) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        let comments = article.comments;

        const indexOfComment = comments.findIndex((comment) => {
          return comment.creation == req.params.creation;
        });
        Article.updateOne(
          { _id: req.params.id },
          {
            $pull: { comments: comments[indexOfComment] },
          }
        )
          .then(() => {
            res.status(200).json({ message: "Comment deleted successfully!" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
