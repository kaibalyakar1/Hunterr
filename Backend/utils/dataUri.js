import DataUriParser from "datauri/parser.js";
import path from "path";
import fs from "fs";

const getDataUri = (file) => {
  if (!file) return null;

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  const fileBuffer = fs.readFileSync(file.path);

  return parser.format(extName, fileBuffer);
};

export default getDataUri;
