document.getElementById("record-time-cookie").addEventListener("click", () => {
  const currentTime = new Date().toLocaleString();
  // Cookieに時刻を保存（有効期限は1日）
  document.cookie = `lastRecordedTime=${currentTime};max-age=86400`;

  // 表示を更新
  document.getElementById(
    "cookie-time-display"
  ).textContent = `最終記録時刻: ${currentTime}`;
});

document.getElementById("record-time-storage").addEventListener("click", () => {
  const currentTime = new Date().toLocaleString();
  // LocalStorageに時刻を保存
  localStorage.setItem("lastRecordedTime", currentTime);

  // 表示を更新
  document.getElementById(
    "storage-time-display"
  ).textContent = `最終記録時刻: ${currentTime}`;
});

// ページ読み込み時に保存された時刻を表示
window.addEventListener("load", () => {
  // Cookie から時刻を取得して表示
  const cookieTime = document.cookie
    .split("; ")
    .find((row) => row.startsWith("lastRecordedTime="))
    ?.split("=")[1];
  if (cookieTime) {
    document.getElementById(
      "cookie-time-display"
    ).textContent = `最終記録時刻: ${cookieTime}`;
  }

  // LocalStorage から時刻を取得して表示
  const storageTime = localStorage.getItem("lastRecordedTime");
  if (storageTime) {
    document.getElementById(
      "storage-time-display"
    ).textContent = `最終記録時刻: ${storageTime}`;
  }
});
