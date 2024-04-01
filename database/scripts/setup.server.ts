// Author: |7eter l-|. l3oling
// License: MIT
// Copyright: 2024
// See: https://gist.github.com/pboling/f831235a1f3c5627f0341c4bbcf37ea9
// Inspired by https://gist.github.com/RavenHursT/1dd87fb3460183b02ed1cf1dba065de8
/*
Usage:

1. Add pre-requisites:

  pnpm add -D pgtools
  pnpm add -D dotenv

2. Add to `package.json`:

```
	"scripts": {
		"db:reset": "tsx src/lib/db/db_reset.server.ts",
		"db:setup": "pnpm db:reset && pnpm db:migrate",
		"db:studio": "drizzle-kit studio --config drizzle.config.ts",
		"db:generate": "drizzle-kit generate:pg --config drizzle.config.ts",
		"db:migrate": "drizzle-kit push:pg --config drizzle.config.ts",
		"db:squash": "rm -rf migrations/* && pnpm db:generate && pnpm db:setup && pnpm db:migrate"
  }
```
*/

import pgtools from "pgtools";
// We can't use svelte env vars here because migrations run without loading svelte or vite.
import * as dotenv from "dotenv";

dotenv.config({});

const DATABASE_NAME: string = process.env.POSTGRES_DATABASE!;
if (DATABASE_NAME === undefined) {
  throw new Error("No name for Scripting SQL");
} else {
  console.log("Database name is:", DATABASE_NAME);
}
const DATABASE_URL: string = process.env.POSTGRES_URL!;
if (DATABASE_URL === undefined) {
  throw new Error("No url for Scripting SQL");
} else {
  console.log("Database URL is:", DATABASE_URL);
}

async function dropDatabase() {
  // Drop it if it already exists
  await pgtools.dropdb(DATABASE_URL, DATABASE_NAME);
}

async function createDatabase() {
  // Then create a new database
  await pgtools.createdb(DATABASE_URL, DATABASE_NAME);
}

function handleDropErrors(err: { message: string | string[] }) {
  if (err.message.indexOf(`does not exist`) === -1) {
    throw err;
  } else {
    console.log("Cold Start Detected! Database does not exist...");
    createDatabase().then(() => {
      console.log("Database created!");
    });
  }
}

dropDatabase()
  .then(() => {
    console.log("Database dropped!");
    createDatabase().then(() => {
      console.log("Database created!");
    });
  })
  .catch(handleDropErrors);
