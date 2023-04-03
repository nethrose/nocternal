# nocternal

This is the building blocks of an observability service to ingest, store, and display, OpenTelemetry metrics, at nocternal.net.

We're building in DigitalOcean App platform, as a Node.js app with a React frontend, and using a DigitalOcean Managed PostgreSQL cluster.

# requirements

* a [DigitalOcean NodeJs App Platform web service](https://docs.digitalocean.com/products/app-platform/how-to/create-apps/) (not a static site) pulling from my or your GitHub repository.
* a [DigitalOcean PostgreSQL Managed Database Cluster](https://docs.digitalocean.com/products/databases/postgresql/how-to/create/)

# building

We've attempted a test to create code purely within the github UI, using ![actions workflows](https://github.com/nethrose/nocternal/actions) to automate things like, generating our package.json and package-lock.json files for our Node project that would normally be a part of the `npm init` process.

So if you ever want to extend the functionality, or adjust or update dependencies, you'll need to set these [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) values to allow them to work and generate updated package-lock.json files.

GITHUB_SECRET | Value and link to documentation
|--|--|
DO_API_TOKEN | [Your Digital Ocean PAT](https://docs.digitalocean.com/reference/api/create-personal-access-token/)
DB_NAME | [Your DO Cluster Name](https://docs.digitalocean.com/developer-center/onboarding-how-to-use-digitalocean-managed-databases/)
DB_USERNAME | [Your DO Connection string Username](https://docs.digitalocean.com/developer-center/onboarding-how-to-use-digitalocean-managed-databases/)
DB_PASSWORD | [Your DO Connection string Password](https://docs.digitalocean.com/developer-center/onboarding-how-to-use-digitalocean-managed-databases/)
DB_HOST | [Your DO DB Host connection string](https://docs.digitalocean.com/developer-center/onboarding-how-to-use-digitalocean-managed-databases/)
DB_PORT | [Your DO DB Port (usually default value, as per these docs, change at your own risk)](https://docs.digitalocean.com/glossary/port/#mysql-postgresql-redis)
DATABASE_ID | [Your DO DB ID value *](https://docs.digitalocean.com/reference/doctl/reference/databases/connection/)

**Note**: that for `DATABASE_ID` the cluster must be active and running, and able to accept connections from CLI, API, or an application like [DataGrip](https://www.jetbrains.com/datagrip/) to run [`doctl databases list`](https://docs.digitalocean.com/reference/doctl/reference/databases/list/) per [The DigitalOcean documentation](https://docs.digitalocean.com/products/databases/postgresql/how-to/connect/).

This repo's [Backend CI](https://github.com/nethrose/nocternal/blob/main/.github/workflows/backend-ci.yml) workflow is set to trigger on any push to the /backend service. We currently have a subdomain of `backend.nocturnal.net` that is hard coded into the workflow and should probably change in the future to allow any domain to use the repo with this configuration.
