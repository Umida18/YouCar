"use client";

import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { FaRegTrashAlt } from "react-icons/fa";
// import { urlToCustomFile } from "@/utils/urlToFile";

interface PhotoUploadProps {
  onPhotosChange?: (fileList: UploadFile[], urls: string[]) => void;
  value?: UploadFile[];
  url: string[] | null;
  setUrl: (i: any) => void;
  setFileL: (i: any) => void;
  existingImages?: string[];
}

export const BASE_URL = "https://api.youcarrf.ru";

export function PhotoUpload({
  onPhotosChange,
  value,
  setUrl,
  // url,
  setFileL,
}: // existingImages,
PhotoUploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>(value || []);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  // const [arrFile, setArrFile] = useState<UploadFile[]>(value || []);
  // const arrFile = [];

  // useEffect(() => {
  //   const f = async () => {
  //     // console.log("fileList", fileList); // Debugging step

  //     let updatedFiles: UploadFile[] = []; // Temporary array

  //     for (const file of fileList) {
  //       if (typeof file === "string") {
  //         console.log("Processing URL:", file);
  //         const d = await urlToCustomFile(file);
  //         updatedFiles.push(d as UploadFile); // Collect files in temporary array
  //       }
  //     }

  //     if (updatedFiles.length > 0) {
  //       setFileList((prev) => {
  //         // Filter out string elements and add new UploadFile objects
  //         const filteredPrev = prev.filter((i) => typeof i !== "string");
  //         return [...filteredPrev, ...updatedFiles];
  //       });
  //     }
  //   };

  //   f();
  // }, [fileList]);
  // Depend on `fileList` to re-run when it changes

  useEffect(() => {
    if (value) {
      setFileList(value);
      setImageUrls(value.map((file) => file.url || ""));
      setFileL(fileList);
    }
  }, [value]);

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    const updatedList = [...fileList, ...newFileList];
    setFileList(updatedList);

    const newUrls = newFileList.map((file) => {
      if (file.originFileObj) {
        return URL.createObjectURL(file.originFileObj);
      }
      return file?.url ? `${BASE_URL}${file.url}` : "";
    });

    setImageUrls((prevUrls) => [...prevUrls, ...newUrls]);

    onPhotosChange?.(updatedList, [...imageUrls, ...newUrls]);
    setUrl((prev: any) => [...prev, ...imageUrls]);
  };

  const handleRemove = (index: number) => {
    const newFileList = fileList.filter((_, i) => i !== index);
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setFileList(newFileList);
    setImageUrls(newImageUrls);
    onPhotosChange?.(newFileList, newImageUrls);
  };

  useEffect(() => {
    if (imageUrls.length > 0) {
      setUrl((prev: any) => [
        ...prev.filter(Boolean),
        ...imageUrls.filter(Boolean),
      ]);
    }
  }, [imageUrls]);

  return (
    <div className="w-full ">
      {fileList.length === 0 ? (
        <Upload
          style={{
            backgroundColor: "transparent",
            border: 0,
            display: "flex",
            justifyContent: "center",
          }}
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false}
          className="bg-[#F4F4F4] rounded-lg p-8 [&_.ant-upload]:!border-0 [&_.ant-upload]:!bg-transparent [&_.ant-upload-list]:!flex  [&_.ant-upload-list]:!justify-center py-16 w-full"
          multiple
        >
          <div className="flex flex-col items-center justify-center gap-4 !w-full">
            <Camera className="w-12 h-12 text-[#2684E5]" />
            <span className="text-sm text-[#2684E5] w-full min-w-64">
              Выберите или перетащите фото
            </span>
          </div>
        </Upload>
      ) : (
        <div className="flex flex-wrap gap-4">
          {fileList.map((file, index) => {
            let src = "";
            if (typeof file === "string") {
              src = file;
            } else if (file.originFileObj) {
              src = URL.createObjectURL(file.originFileObj);
            } else if (file.url) {
              src = `${BASE_URL}${file.url}`;
            }

            return (
              <div
                key={typeof file === "object" && file.uid ? file.uid : index}
                className="relative"
              >
                <img
                  src={src}
                  alt={`Photo ${index + 1}`}
                  className="h-[150px] w-[150px] object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 bg-white text-[#2684E5] hover:bg-[#2684E5] hover:text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            );
          })}

          <Upload
            listType="picture-card"
            fileList={[]}
            onChange={handleChange}
            beforeUpload={() => false}
            multiple
            style={{ border: 0, minHeight: "150px" }}
            className="[&_.ant-upload]:!h-[150px] [&_.ant-upload]:!w-[150px] border-0 [&_.ant-upload]:!border-0"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <Camera className="w-6 h-6 text-[#2684E5]" />
              <span className="text-xs text-[#2684E5]">Добавить фото</span>
            </div>
          </Upload>
        </div>
      )}
    </div>
  );
}
