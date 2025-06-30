module.exports = {
  apps: [
    {
      name: 'llama-api',
      cwd: '/var/www/llama/backend',            // ← run from inside the backend/ dir
      script: '../venv/bin/python3',           // ← Python virtualenv lives one level up
      args: '-m uvicorn main:app --host 0.0.0.0 --port 8005',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
