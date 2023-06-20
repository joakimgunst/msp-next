# Munksnäs Spejarna web site

This is the web site for the scout group Munksnäs Spejarna. It is located at [www.munksnasspejarna.fi](https://www.munksnasspejarna.fi/). The site is created using [Next.js](https://nextjs.org/) with [Contentful](https://www.contentful.com/) as a CMS. It is deployed to [Vercel](https://vercel.com/).

## Development with Vercel CLI

Using the Vercel CLI is currently only available to [Joakim](https://github.com/joakimgunst), as the project uses the free single-user Hobby plan.

Install the Vercel CLI:

```bash
npm i -g vercel
```

Login to Vercel:

```bash
vercel login
```

Link the project:

```bash
vercel
```

Download the environment variables:

```bash
vercel env pull
```

Run the development server:

```bash
vercel dev
```

## Development without the Vercel CLI

Create an `.env` file with the following environment variables, which you can get from Joakim.

```txt
CONTENTFUL_SPACE_ID=<space_id>
CONTENTFUL_ACCESS_TOKEN=<access_token>
CONTENTFUL_PREVIEW_ACCESS_TOKEN=<preview_access_token>
CONTENTFUL_PREVIEW_SECRET=<preview_secret>
```

Run the development server:

```bash
yarn dev
```

## Deployments

To deploy to a preview environment run:

```bash
vercel deploy
```

To manually deploy to production run:

```bash
vercel deploy --prod
```

A new production deployment is done automatically whenever code is pushed to the `master` branch on GitHub.

A webhook is also configured in Contentful so that a production deployment is done whenever there are changes in the content.

## Contentful

Contentful types are automatically generated and are located in the `contentful/types` directory. To generate types, first create a personal access token in the Contentful app. You can then run:

```
export CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=<token>
pnpm generate-contentful-types
```
