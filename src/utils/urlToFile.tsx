interface CustomFile {
  uid: string;
  name: string;
  lastModified: number;
  size: number;
  type: string;
  percent: number;
  originFileObj: File;
}

export async function urlToCustomFile(url: string): Promise<CustomFile> {
  try {
    // Fetch the image
    const response = await fetch(url);
    const blob = await response.blob();

    // Generate a filename from the URL or use a default one
    const urlParts = url.split("/");
    const fileName =
      decodeURIComponent(urlParts[urlParts.length - 1]) || "image.jpg";

    // Create a File object
    const file = new File([blob], fileName, { type: blob.type });

    // Get current timestamp
    const now = Date.now();

    // Create a unique ID for rc-upload
    const uid = `rc-upload-${now}-${Math.floor(Math.random() * 100)}`;

    // Create the custom file object with required properties
    const customFile: CustomFile = {
      uid,
      name: fileName,
      lastModified: now,
      size: blob.size,
      type: blob.type,
      percent: 0,
      originFileObj: file,
    };

    return customFile;
  } catch (error) {
    console.error("Error converting URL to File:", error);
    throw error;
  }
}

// Usage example:
// export async function convertExistingImageUrl(url: string) {
//   try {
//     const customFile = await urlToCustomFile(url);
//     return [customFile]; // Return as array since upload components usually expect an array
//   } catch (error) {
//     console.error("Error converting image:", error);
//     return [];
//   }
// }
