# Setup Instructions

## Quick Start with Docker

1. **Start the services:**
   ```bash
   docker-compose up -d
   ```

2. **Wait for MySQL initialization** (check logs):
   ```bash
   docker-compose logs -f mysql
   ```
   Wait until you see "MySQL init process done. Ready for start up."

3. **Check if the app is running:**
   ```bash
   docker-compose logs -f app
   ```

4. **Access the dashboard:**
   Open http://localhost:3000 in your browser

## Troubleshooting

### MySQL not initializing
- Check if port 3306 is available
- Verify the SQL file is in `NeededResourcesToUse/classicmodels.sql`
- Check logs: `docker-compose logs mysql`

### App not connecting to database
- Ensure MySQL is healthy: `docker-compose ps`
- Check environment variables in docker-compose.yml
- Wait a few seconds after MySQL starts before accessing the app

### Port conflicts
- Change ports in docker-compose.yml if 3000 or 3306 are in use

## Development Mode

For local development without Docker:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up MySQL locally** and import the SQL file

3. **Create `.env.local`:**
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USER=your_user
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=classicmodels
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

## Stopping Services

```bash
docker-compose down
```

To remove volumes (clears database):
```bash
docker-compose down -v
```
