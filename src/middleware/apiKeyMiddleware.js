import dotenv from "dotenv";

dotenv.config();

export const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "API key is missing",
      errors: "Unauthorized access",
    });
  }

  if (String(apiKey) !== String(process.env.API_KEY)) {
    return res.status(403).json({
      status: "error",
      code: 403,
      message: "Invalid API key",
      errors: "Forbidden access",
    });
  }

  next();
};
