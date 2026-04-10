#!/bin/bash
set -e

VPS="$(whoami)@oram.cz"
REMOTE_DIR="/www/vojtechoram-new"

echo "Deploying vojtechoram.cz..."

ssh "$VPS" bash -s <<EOF
  set -e
  cd $REMOTE_DIR
  echo "Pulling latest changes..."
  git pull
  echo "Installing dependencies..."
  npm ci
  echo "Building..."
  npm run build
  echo "Done! Site deployed to $REMOTE_DIR/dist/"
EOF

echo "Deployment complete."
