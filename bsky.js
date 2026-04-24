(function () {
  const HANDLE = 'deepspacecoalition.bsky.social';

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  const container = document.getElementById('bskyFeed');
  if (!container) return;

  fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${HANDLE}&limit=20`)
    .then(r => {
      if (!r.ok) throw new Error();
      return r.json();
    })
    .then(data => {
      container.innerHTML = '';
      const posts = (data.feed || []).filter(item => !item.reason);

      if (!posts.length) {
        const msg = document.createElement('p');
        msg.className = 'bsky-empty';
        msg.textContent = 'No posts yet.';
        container.appendChild(msg);
        return;
      }

      posts.forEach(({ post }) => {
        const record = post.record;
        const postId = post.uri.split('/').pop();
        const url = `https://bsky.app/profile/${HANDLE}/post/${postId}`;

        const item = document.createElement('a');
        item.className = 'bsky-post';
        item.href = url;
        item.target = '_blank';
        item.rel = 'noopener';

        const images = post.embed?.images ?? post.embed?.media?.images;
        if (images?.length) {
          const img = document.createElement('img');
          img.src = images[0].thumb;
          img.className = 'bsky-post-img';
          img.loading = 'lazy';
          img.decoding = 'async';
          img.alt = images[0].alt || '';
          item.appendChild(img);
        }

        if (record.text) {
          const text = document.createElement('div');
          text.className = 'bsky-post-text';
          text.textContent = record.text;
          item.appendChild(text);
        }

        const meta = document.createElement('div');
        meta.className = 'bsky-post-meta';
        meta.textContent = timeAgo(post.indexedAt);
        item.appendChild(meta);

        container.appendChild(item);
      });
    })
    .catch(() => {
      container.innerHTML = '';
      const msg = document.createElement('p');
      msg.className = 'bsky-empty';
      msg.textContent = 'Feed unavailable.';
      container.appendChild(msg);
    });
})();
