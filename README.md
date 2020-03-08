# Scoutkåren Munksnäs Spejarna

This is the new web site for the scout group Munksnäs Spejarna. It will replace the old site at [www.munksnasspejarna.fi](https://www.munksnasspejarna.fi/) when complete. The site is created using [Next.js](https://nextjs.org/) with [Contentful](https://www.contentful.com/) as a CMS. It is deployed to [ZEIT Now](https://zeit.co/).

## Development

Install the Now CLI:

```bash
npm i -g now
```

Create an `.env.build` file in the root directory and enter the following values, which you can get from [Joakim](https://github.com/joakimgunst):

```txt
CONTENTFUL_SPACE_ID=<space_id>
CONTENTFUL_ACCESS_TOKEN=<access_token>
```

Then run the development server:

```bash
now dev
```

To deploy to a feature environment run:

```bash
now deploy
```

To deploy to production run:

```bash
now deploy --prod
```
