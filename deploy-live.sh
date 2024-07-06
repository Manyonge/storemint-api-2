#!/bin/bash

# Update code from remote repository
git checkout main
git pull
bun install

# Set environment variable for production
environment="production"

# Construct BaseUrl based on environment
BaseUrl="https://api.storemint.shop/api"

# Update src/BaseUrl.ts content
echo "export const environments = {
  production: \"production\",
  development: \"development\",
};

const productionUrl = \"${BaseUrl}\";
// const developmentUrl = \"https://apidev.storemint.shop/api\";
// const localUrl = \"http://localhost:9000/api\";

export const environment = environments.${environment};
export const BaseUrl = productionUrl;" > src/BaseUrl.ts

# Build the project using bun
bun run build

echo "Update complete. Built project with production environment."
