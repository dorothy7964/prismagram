import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import cors from "cors";
import schema from "./schema";
import "./passport";   
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares"
import { 
    uploadMiddleware, uploadController, 
    uploadsMiddleWare, uploadsController 
} from "./upload";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({   
    schema,
    context: ({ request }) => ({ request, isAuthenticated })
});

// server.express.use(cors());
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload",  cors(), uploadMiddleware, uploadController);
server.express.post("/api/uploads", cors(), uploadsMiddleWare, uploadsController);

server.start({ port: PORT }, () =>
    console.log(`Server running on  http://localhost:${PORT}`)
);