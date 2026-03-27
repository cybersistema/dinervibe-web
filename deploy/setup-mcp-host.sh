#!/bin/bash
# DinerVibe MCP Host Setup Script
# Run this on the MCP server (192.168.50.160) as root or with sudo
# Usage: bash setup-mcp-host.sh [GITHUB_TOKEN]

set -e

REPO_URL="https://github.com/cybersistema/dinervibe-web.git"
DEPLOY_DIR="/DATA/AppData/dinervibe"
REPO_DIR="$DEPLOY_DIR/dinervibe-web"

# Use token if provided (for private repo)
if [ -n "$1" ]; then
  REPO_URL="https://$1@github.com/cybersistema/dinervibe-web.git"
elif [ -n "$GITHUB_TOKEN" ]; then
  REPO_URL="https://$GITHUB_TOKEN@github.com/cybersistema/dinervibe-web.git"
fi

echo "==> Creating deployment directory: $DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

echo "==> Fetching latest code..."
if [ -d "$REPO_DIR/.git" ]; then
  cd "$REPO_DIR"
  git fetch origin
  git reset --hard origin/main
  echo "    Updated existing clone."
else
  git clone "$REPO_URL" "$REPO_DIR"
  echo "    Cloned fresh."
fi

echo "==> Writing docker-compose.yml..."
cat > "$DEPLOY_DIR/docker-compose.yml" << 'EOF'
services:
  dinervibe-web:
    build:
      context: ./dinervibe-web
      dockerfile: Dockerfile
    image: dinervibe-web:latest
    container_name: dinervibe-web
    ports:
      - "4000:80"
    restart: unless-stopped
    labels:
      - "com.vertivine.project=dinervibe"
      - "com.vertivine.env=lan-test"
EOF

echo "==> Building and starting container..."
cd "$DEPLOY_DIR"
docker compose up -d --build

echo ""
echo "===================================="
echo "  DinerVibe is running!"
echo "  Open: http://192.168.50.160:4000"
echo "===================================="
docker compose ps
