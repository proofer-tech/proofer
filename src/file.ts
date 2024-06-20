import { Blob, File } from "@web-std/file";

export const blobToBase64 = (blob: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};
export const base64ToFile = (base64String: string, filename?: string): File => {
  const mimeTest = base64String.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
  const mime = mimeTest && mimeTest[0];
  const extension = mime?.split("/")[1] || "jpg";

  const byteCharacters = atob(base64String.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  return new File(
    [byteArray],
    `${filename || crypto.randomUUID()}.${extension}`,
  );
};
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
