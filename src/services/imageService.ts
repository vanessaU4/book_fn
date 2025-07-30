export const imageService = {
  getImageUrl(path: string): string {
    if (!path) return "";

    // If the path is already a full URL, return it
    if (path.startsWith("http")) {
      return path;
    }

    // For development environment
    if (path.startsWith("/media/")) {
      return `https://book-hub-5-vjef.onrender.com${path}`;
    }

    // For paths without /media/ prefix
    return `https://book-hub-5-vjef.onrender.com/media/${path}`;
  },
};
