const persistence = process.env.MODE || "PROD";

let logger;

switch (persistence) {
  case "PROD":
    const { default: winstonProd } = await import("./winstonProd.jss");
    logger = winstonProd;
    break;
  default:
    const { default: winston } = await import("./winston.js");
    logger = winston;
    break;
}

export default logger;
