import dotenv from "dotenv";
dotenv.config();

const AppConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb+srv://<user>:<password>@clustersavetext.byzuc.mongodb.net/db_savetext?retryWrites=true&w=majority&appName=ClusterSaveText",
  CORS_OPTIONS: {
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    maxAge: 86400,
  },
  JWT_SECRET: process.env.JWT_SECRET || "LxoGHMh9E8jNE8ufN66C450mltw238Qu9g",
  EXPIRES_IN: process.env.EXPIRES_IN || "1h",
};

export default AppConfig;
