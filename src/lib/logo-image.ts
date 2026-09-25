export const PUBLIC_LOGO_SRC = "/logo.png";

export function compressLogoDataUrl(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const maxH = 200;
      const maxW = 800;
      let width = image.naturalWidth || 1;
      let height = image.naturalHeight || 1;
      const scale = Math.min(1, maxH / height, maxW / width);
      width = Math.max(1, Math.round(width * scale));
      height = Math.max(1, Math.round(height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => reject(new Error("invalid image"));
    image.src = dataUrl;
  });
}

export function persistPublicLogo(dataUrl: string) {
  if (!dataUrl) {
    void fetch("/api/logo", { method: "DELETE" });
    return;
  }
  void fetch("/api/logo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dataUrl }),
  });
}
