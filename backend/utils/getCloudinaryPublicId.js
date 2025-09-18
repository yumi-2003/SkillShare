function getCloudinaryPublicId(url) {
  try {
    const parts = url.split("/");
    const filename = parts[parts.length - 1]; // e.g. "image.jpg"
    const publicId = filename.split(".")[0]; // remove extension
    // Rebuild with folder path if inside "skillshare"
    if (parts.includes("skillshare")) {
      const folderIndex = parts.indexOf("skillshare");
      return parts.slice(folderIndex).join("/").split(".")[0];
    }
    return publicId;
  } catch (err) {
    return err;
  }
}
module.exports = getCloudinaryPublicId;
