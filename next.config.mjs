// next.config.mjs
export default {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: false,  // "false" para redirigir solo durante el desarrollo o cuando la URL cambie
        },
      ];
    },
  };
  