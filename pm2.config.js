module.exports = {
  apps: [
    {
      name: "api-server",
      script: "tsx",
      args: "web/api-server.ts",
      watch: false
    },
    {
      name: "cron-job",
      script: "tsx",
      args: "scheduler/cron.ts",
      watch: false
    }
  ]
};
