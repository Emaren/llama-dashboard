module.exports = {
  apps: [
    {
      name: 'llama-dashboard',
      script: './start-llama.sh',                       // <-- shell script here
      cwd: '/var/www/llama-dashboard/frontend',
      interpreter: 'bash',                              // <-- run with bash
      env: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_BASE: 'http://localhost:8005',
      },
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
    },
  ],
};
