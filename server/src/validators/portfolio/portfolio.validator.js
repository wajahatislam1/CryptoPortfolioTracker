const { checkSchema, checkExact } = require("express-validator");

const addPortfolioValidator = checkExact(
  checkSchema({
    avatar: {
      notEmpty: {
        errorMessage: "Avatar is required",
      },
      isString: {
        errorMessage: "Avatar must be a string",
      },
    },
    avatarColor: {
      notEmpty: {
        errorMessage: "AvatarColor is required",
      },
      matches: {
        options: ["^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"],
        errorMessage: "AvatarColor must be a hex color string",
      },
    },
    name: {
      notEmpty: {
        errorMessage: "Name is required",
      },
      isString: {
        errorMessage: "Name must be a string",
      },
    },
    includeInTotal: {
      notEmpty: {
        errorMessage: "includeInTotal is required",
      },
      isBoolean: {
        errorMessage: "includeInTotal must be a boolean",
      },
    },
  })
);

const updatePortfolioValidator = checkExact(
  checkSchema({
    avatar: {
      optional: true,
      isString: {
        errorMessage: "Avatar must be a string",
      },
    },
    avatarColor: {
      optional: true,
      matches: {
        options: ["^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"],
        errorMessage: "AvatarColor must be a hex color string",
      },
    },
    name: {
      optional: true,
      isString: {
        errorMessage: "Name must be a string",
      },
    },
    includeInTotal: {
      optional: true,
      isBoolean: {
        errorMessage: "includeInTotal must be a boolean",
      },
    },
    id: {
      in: "params",
      notEmpty: {
        errorMessage: "Id is required",
      },
      isString: {
        errorMessage: "Id must be a string",
      },
    },
  })
);

const addCoinToPortfolioValidator = checkExact(
  checkSchema({
    _id: {
      in: "body",
      notEmpty: {
        errorMessage: "Id is required",
      },
      isString: {
        errorMessage: "Id must be a string",
      },
    },

    name: {
      in: "body",
      notEmpty: {
        errorMessage: "Name is required",
      },
      isString: {
        errorMessage: "Name must be a string",
      },
    },
    symbol: {
      in: "body",
      notEmpty: {
        errorMessage: "Symbol is required",
      },
      isString: {
        errorMessage: "Symbol must be a string",
      },
    },

    slug: {
      in: "body",
      notEmpty: {
        errorMessage: "Slug is required",
      },
      isString: {
        errorMessage: "Slug must be a string",
      },
    },

    logo: {
      in: "body",
      notEmpty: {
        errorMessage: "Logo is required",
      },
      isString: {
        errorMessage: "Logo must be a string",
      },
    },

    url: {
      in: "body",
      notEmpty: {
        errorMessage: "Url is required",
      },
      isString: {
        errorMessage: "Url must be a string",
      },
    },

    id: {
      in: "params",
      notEmpty: {
        errorMessage: "Id is required",
      },
      isString: {
        errorMessage: "Id must be a string",
      },
    },
  })
);
module.exports = { addPortfolioValidator, updatePortfolioValidator, addCoinToPortfolioValidator };
