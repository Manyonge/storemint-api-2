#!/bin/bash

# Update code from remote repository
git checkout master
git pull
bun install


# Build the project using bun
bun run build

#restart pm2
pm2 restart storemint-live

echo "Update complete."
