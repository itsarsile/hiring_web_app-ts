import { Group, Image, Text } from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { useState } from "react";
import { FiImage, FiUpload, FiX } from "react-icons/fi";

type UploadedFile = File;

interface DragUploadProps {
  uploadedFiles: FileWithPath[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
}
function DragUpload({
  uploadedFiles,
  setUploadedFiles,
  ...props
}: {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  props: Partial<DropzoneProps>;
}) {

  const previews = uploadedFiles.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        alt=""
      />
    );
  });
  return (
    <>
      <Dropzone
        onDrop={(files) => setUploadedFiles([...uploadedFiles, ...files])}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
      >
        <Group position="center" spacing="xl" className="min-h-16">
          <Dropzone.Accept>
            <FiUpload />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <FiX />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <FiImage />
          </Dropzone.Idle>
          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
          </div>
        </Group>
      </Dropzone>
      {previews}
    </>
  );
}

export default DragUpload;
