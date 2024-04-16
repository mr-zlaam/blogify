import { app } from "./src/app.ts";
import { Config } from "./src/config/_config.ts";
import connectDB from "./src/config/db.ts";

const startServer = (): void => {
  const port = Config.PORT || 5173;
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(
        `Server is listening on port:- *** http://localhost:${port}/  ***`
      );
    });
  });
};
startServer();
