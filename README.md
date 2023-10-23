# A Twitter clone with unique features from scratch

## A project that adheres to agile methodology and SDLC.

This project is built along with devops practices such as lint-staged, and prettier. It also includes decisions in deployment whether a staging branch is needed or not. This project shows how to do the following:

* Set up an linting using lint-staged
* Documenting the project e.g. FR & NFR, and README
* Create a typescript NextJS full stack application with PlanetScale and Prisma
* Create features that uses realtime communication technologies such as websocket, and webhooks.
* Create features that authenticates users using jwt token, AuthJS, and social login.
* Apply testing practices using vitest
* NextJS Deployment using vercel for production and previews
* MySQL deployment using Planetscale and Prisma
* Github Project management using Agile Method
* Apply devops practices such as collaboration, testing, deployment

## insert project diagram (coming soon!)

## How to install this project
1. Clone this project
2. Use pnpm as the package manager
3. pnpm add - to install all dependencies
4. Set up your (.env) environment variables - PRISMA_USERNAME, PRISMA_PASSWORD, and DATABASE_URL

## Developer Instruction
1. Install the project
2. pnpm run dev - to run the project locally
3. pnpm run prisma:generate - to sync schema.prisma to prisma client
4. pnpm run prisma:seed - (optional) to run seeder file that inserts data to backend
5. pnpm run pre-commit - (optional: this will run when you git commit) to apply linting process to your changed files

## Improve README.md
If you find the instruction lacking, raise an issue to discuss improvements.

## Find a bug?
If you found an issue or would like to submit an improvement to this project, create an issue that contains the context, the problem, and the reproducible code
