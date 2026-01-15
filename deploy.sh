#!/bin/bash

# Deployment script to keep local, git, and server in sync
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment process..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Ensure local changes are committed
echo -e "${YELLOW}Step 1: Checking local changes...${NC}"
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    git status
    exit 1
fi

# Step 2: Push to GitHub
echo -e "${YELLOW}Step 2: Pushing to GitHub...${NC}"
git push origin main
echo -e "${GREEN}✅ Pushed to GitHub${NC}"

# Step 3: Pull on server
echo -e "${YELLOW}Step 3: Pulling on server...${NC}"
ssh contabo "sudo su - -c 'cd /root/BigDataProject && git pull'"
echo -e "${GREEN}✅ Pulled on server${NC}"

# Step 4: Rebuild and restart containers
echo -e "${YELLOW}Step 4: Rebuilding and restarting containers...${NC}"
ssh contabo "sudo su - -c 'cd /root/BigDataProject && docker compose -f docker-compose.prod.yml down && docker compose -f docker-compose.prod.yml build && docker compose -f docker-compose.prod.yml up -d'"
echo -e "${GREEN}✅ Containers rebuilt and restarted${NC}"

# Step 5: Verify deployment
echo -e "${YELLOW}Step 5: Verifying deployment...${NC}"
sleep 5
if ssh contabo "sudo su - -c 'docker ps | grep bigdata_dashboard | grep Up'" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo ""
    echo "🌐 Application is available at: https://bigdata.ilmora.uz"
else
    echo "❌ Deployment verification failed. Check logs:"
    ssh contabo "sudo su - -c 'docker logs bigdata_dashboard --tail 50'"
    exit 1
fi

echo ""
echo -e "${GREEN}✨ Deployment complete!${NC}"
