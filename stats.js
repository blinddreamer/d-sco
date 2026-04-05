fetch("https://zkillboard.com/api/stats/corporationID/98519746/")
  .then((res) => res.json())
  .then((data) => {
    const fmt = (n) => {
      if (n >= 1e12) return (n / 1e12).toFixed(1) + "T";
      if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
      if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
      return n.toLocaleString();
    };

    document.getElementById("stat-kills").textContent = fmt(data.shipsDestroyed ?? 0);
    document.getElementById("stat-isk").textContent = fmt(data.iskDestroyed ?? 0) + " ISK";
    document.getElementById("stat-lost").textContent = fmt(data.shipsLost ?? 0);
  })
  .catch(() => {});
