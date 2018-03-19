
module.exports = {
    "extends": ["airbnb-base", "prettier"],
    "env": {
        "node": true,
        "mocha": true,
        "amd": true
    },
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "error"
    },
    "globals": {
        "expect":true,
    }
};
