import app from "./app";
import initDB from "./config/db";
import config from "./config/intex";

const startServer = async () => {
  await initDB();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

startServer();
