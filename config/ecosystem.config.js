module.exports = {
  apps: [

    {
      name: "hekazi-manager",
      
      script: "./dist/src/main.js",

      watch: false,
      "ignore_watch": [" node_modules", "static"],
      env: {
        "PORT": 9080,

        "NODE_ENV": "prod"

      },

    }

  ]

}