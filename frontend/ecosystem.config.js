module.exports = {
  apps: [
    {
      name: 'llama-dashboard',
      cwd: '/var/www/llama/frontend',
      script: 'npx',
      args: 'next start -p 3005',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
