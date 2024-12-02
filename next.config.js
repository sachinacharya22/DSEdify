module.exports = {
    async redirects() {
      return [
        {
          source: '/', // Root URL
          destination: '/registration', // Redirect to /registration
          permanent: true, // Set to true if the redirect is permanent
        },
      ];
    },
  };