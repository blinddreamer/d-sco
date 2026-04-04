# D-SCO Website

Static website for the Deep Space Coalition EVE Online corporation, served via nginx in Docker.

## Stack

- **nginx** (Alpine) — static file serving
- **Docker** — containerized deployment
- **GitHub Actions** — auto-builds and pushes image to Docker Hub on every push

## Deployment

```bash
docker run -d \
  --name d-sco.rocks \
  -p 80:80 \
  -v dsco-news:/usr/share/nginx/html/assets/news \
  blinddreamer/d-sco:latest
```

The `assets/news` directory is volume-mounted so news can be updated without rebuilding the container.

---

## Adding Weekly News

1. Drop the new image into the volume on the server:
   ```
   /var/lib/docker/volumes/dsco-news/_data/weekly_news_XX.jpg
   ```

2. Add a new entry to the **top** of `news-data.json` in the same folder:
   ```json
   [
     { "file": "weekly_news_12.jpg", "title": "Your headline here" },
     { "file": "weekly_news_11.jpg", "title": "Previous headline" },
     ...
   ]
   ```

The first entry in the array always gets the **HOT** badge automatically. No container restart needed.

### news-data.json format

```json
[
  { "file": "weekly_news_XX.jpg", "title": "Headline for this issue" }
]
```

| Field   | Description                                      |
|---------|--------------------------------------------------|
| `file`  | Image filename inside the `assets/news/` folder  |
| `title` | Headline shown below the image in the carousel   |

> Image files and `news-data.json` live only on the server volume — they are not tracked in this repo.
