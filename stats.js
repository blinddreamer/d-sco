(function () {
  fetch("https://zkillboard.com/api/stats/corporationID/98519746/")
    .then(function (res) {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(function (data) {
      function fmt(n) {
        if (n >= 1e12) return (n / 1e12).toFixed(1) + "T";
        if (n >= 1e9)  return (n / 1e9).toFixed(1)  + "B";
        if (n >= 1e6)  return (n / 1e6).toFixed(1)  + "M";
        return n.toLocaleString();
      }
      var kills = document.getElementById("stat-kills");
      var isk   = document.getElementById("stat-isk");
      var lost  = document.getElementById("stat-lost");
      if (kills) kills.textContent = fmt(data.shipsDestroyed ?? 0);
      if (isk)   isk.textContent   = fmt(data.iskDestroyed   ?? 0) + " ISK";
      if (lost)  lost.textContent  = fmt(data.shipsLost      ?? 0);
    })
    .catch(function (e) { console.error("Failed to load stats:", e); });
})();
