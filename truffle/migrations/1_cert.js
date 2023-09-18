const fs = require("fs");
const Cert = artifacts.require("Cert");

module.exports = function (deployer) {
  deployer
    .deploy(Cert)
    .then((instance) => {
      const deployer = instance.constructor.class_defaults;
      fs.writeFileSync(
        "../src/deployer.json",
        JSON.stringify(deployer, null, 2)
      );
    })
    .catch((error) => {
      console.error(error);
    });
};
