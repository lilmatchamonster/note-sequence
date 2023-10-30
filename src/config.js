const config = {
  endpoint: {
    development: process.env.REACT_APP_DEV_ENDPOINT,
    production: process.env.REACT_APP_PROD_ENDPOINT,
  }[process.env.NODE_ENV],
};

export default config;