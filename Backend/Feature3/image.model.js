import fs from "fs";

export const saveEvidence = (data) => {
  let records = [];

  if (fs.existsSync("evidence.json")) {
    records = JSON.parse(fs.readFileSync("evidence.json"));
  }

  records.push(data);
  fs.writeFileSync("evidence.json", JSON.stringify(records, null, 2));
};
