# 📁 File Upload Utility – React Usage Guide

This guide shows how to use the SmartBin file upload utility in a **React** project.

---

## ✅ Supported Image Types

Only the following image types are allowed:
- `image/jpeg`
- `image/png`
- `image/gif`
- `image/webp`
- `image/svg+xml`

---

## 🚀 Functions Available

Import the utility functions like so:

```js
import {
  uploadFile,
  uploadMultipleFiles,
  dataURLtoFile,
  uploadDataURL,
} from "@/utils/fileUpload";
```

---

## 1. 📤 Upload a Single File

```jsx
import React, { useState } from "react";
import { uploadFile } from "@/utils/fileUpload";

const SingleFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const response = await uploadFile(file, (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Progress: ${percent}%`);
      });
      setUrl(response.url);
    } catch (error) {
      console.error("Upload failed:", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p>Uploading...</p>}
      {url && <img src={url} alt="Uploaded" width={200} />}
    </div>
  );
};
```

---

## 2. 📤 Upload Multiple Files

```jsx
import React, { useState } from "react";
import { uploadMultipleFiles } from "@/utils/fileUpload";

const MultiFileUpload = () => {
  const [urls, setUrls] = useState([]);

  const handleMultiUpload = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const responses = await uploadMultipleFiles(files);
      setUrls(responses.map((res) => res.url));
    } catch (error) {
      console.error("Multiple upload failed:", error.message);
    }
  };

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleMultiUpload} />
      <div className="flex flex-wrap gap-2 mt-4">
        {urls.map((url, idx) => (
          <img key={idx} src={url} alt={`Uploaded ${idx}`} width={150} />
        ))}
      </div>
    </div>
  );
};
```

---

## 3. 📤 Upload a Base64 Image (Data URL)

```jsx
import React, { useState } from "react";
import { uploadDataURL } from "@/utils/fileUpload";

const UploadBase64 = () => {
  const [imageUrl, setImageUrl] = useState("");

  const sampleBase64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."; // truncated

  const handleUpload = async () => {
    try {
      const response = await uploadDataURL(sampleBase64, "screenshot.png");
      setImageUrl(response.url);
    } catch (error) {
      console.error("Base64 upload failed:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload Base64 Image</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" width={200} />}
    </div>
  );
};
```

---

## 🧪 Convert Data URL to File (for canvas or crop tools)

```js
import { dataURLtoFile } from "@/utils/fileUpload";

const file = dataURLtoFile(base64String, "image-name.jpg");
await uploadFile(file);
```

---

## ⚠️ Error Handling Tips

Always use `try/catch` blocks when uploading:

```js
try {
  const res = await uploadFile(file);
} catch (error) {
  console.error("Upload failed:", error.message);
}
```

This handles:
- Unsupported file types
- Network/server errors
- Missing file input

---

## 📦 Summary

| Function             | Purpose                                |
|----------------------|----------------------------------------|
| `uploadFile()`       | Upload a single image file             |
| `uploadMultipleFiles()` | Upload multiple image files       |
| `dataURLtoFile()`    | Convert base64 to a File object        |
| `uploadDataURL()`    | Upload base64 image string directly    |

---
