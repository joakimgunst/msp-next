module.exports = {
  compiler: {
    styledComponents: true,
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  eslint: {
    dirs: ['src'],
  },
};
