document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById(
      "fileName"
    ).textContent = `Selected File: ${file.name}`;

    const blobUrl = URL.createObjectURL(file);
    const shareableUrl = `${window.location.origin}${
      window.location.pathname
    }#file=${encodeURIComponent(blobUrl)}&name=${encodeURIComponent(
      file.name
    )}`;
    document.getElementById(
      "shareLink"
    ).innerHTML = `<a class="share-link" href="${shareableUrl}" target="_blank">Share this link</a>`;
  });

window.onload = function () {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const fileUrl = params.get("file");
  const fileName = params.get("name");
  if (fileUrl) {
    const container = document.querySelector(".container");
    container.innerHTML = "<h2>Download Shared File</h2>";
    if (fileName) {
      const fileNameDisplay = document.createElement("p");
      fileNameDisplay.textContent = `File: ${decodeURIComponent(fileName)}`;
      fileNameDisplay.style.fontWeight = "bold";
      container.appendChild(fileNameDisplay);
    }
    const link = document.createElement("a");
    link.href = fileUrl;
    link.textContent = "Download File";
    link.download = fileName || "shared_file";
    link.className = "download-link";
    container.appendChild(link);
  }
};
