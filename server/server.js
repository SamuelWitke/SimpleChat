const path = require("path");
const { ensureDir } = require("fs-extra");
const polka = require("polka");
const helmet = require("helmet");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const { sessionSecret, sessionStorePath } = require("./config");
const sirv = require('sirv');
const { host, port } = require("./common/config");
const { setupWss } = require("./ws-server");

const setup = async () => {
  const env = process.env.NODE_ENV || "development";

  await ensureDir(sessionStorePath);


  const app = polka().listen(process.env.PORT || 8080, err => { 
    if (err) throw err;
    console.log(`Running on port: ${process.env.PORT || 8080}`)
  });

  const sessionStore = new LevelStore(sessionStorePath);

  const sessionMiddleware = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: env !== "development" },
    // for larger, distributed, APIs use redis or something else instead
    store: sessionStore,
  });

  setupWss(app, sessionMiddleware);

  const public = path.join(__dirname, 'build');
  const files = sirv('build');

 
  console.log(public);
  app
    .use(helmet())
    .use(sessionMiddleware)
    .use(files);

   
   
};

setup();
