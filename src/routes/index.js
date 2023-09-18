import { Router } from "express";
import multer from "multer";
import { create } from "kubo-rpc-client";

const router = Router();
const upload = multer();
import { contractInstance, account, web3Connection } from "../instance.js";

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "KBA" });
});

/* GET issue page. */
router.get("/issue", function (req, res) {
  res.render("issueCertificate", {
    messageClass: "hidden",
    formClass: "",
    certificateID: "",
  });
});

router.post("/issue", upload.single("document"), async function (req, res) {
  const data = req.body;
  const document = req.file;
  console.log(data);
  console.log(document);

  // ipfs setup
  const ipfs = create("/ip4/127.0.0.1/tcp/5001");
  const result = await ipfs.add(document.buffer);
  console.log(result.path);
  const documentHash = web3Connection.utils.asciiToHex(result.path);
  console.log(documentHash);

  const trx = await contractInstance.methods
    .issue(
      data.certificateID,
      data.name,
      data.course,
      data.grade,
      data.date,
      documentHash
    )
    .send({ from: account, gas: 927000 });
  console.log(trx);
  res.render("issueCertificate", {
    messageClass: "",
    formClass: "hidden",
    certificateID: data.certificateID,
  });
});

router.post("/view", async function (req, res) {
  const id = req.body.certificateID;
  console.log(id);

  const data = await contractInstance.methods.Certificates(id).call();
  data.certificateID = id;
  data.document = web3Connection.utils.hexToAscii(data.document);

  res.render("viewCertificate", { data });
});

export default router;
