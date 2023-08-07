import { supabase } from "@/lib/supabase";
import {
    Avatar,
    Button,
    FileInput,
    Modal,
    Stack
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";

export default function AvatarModal({ opened, onClose, userId }: any) {
  type FormValues = {
    avatar: string | null;
  };
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const previews = uploadedFiles.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Avatar
        key={index}
        src={imageUrl}
        className="w-28 h-28 rounded-full mb-5"
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        alt=""
      />
    );
  });
  const form = useForm<FormValues>({
    initialValues: {
      avatar: null,
    },
  });

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      setUploadedFiles([file]);
    }
  };

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const { data } = await supabase.storage
        .from("avatar")
        .upload(uploadedFiles[0].name, uploadedFiles[0])
    
        if (data) {
            const { data: publicUrl } = supabase.storage
              .from("avatar")
              .getPublicUrl(data?.path);
            values.avatar = publicUrl.publicUrl;
          }

        const response = await axios.patch(`/api/users/${userId}`, values);
        if (response.status === 200) {
            notifications.show({
              title: 'Avatar Updated',
              color: 'teal',
              message: 'Avatar updated successfully',
            })
            mutate(`/api/users/${userId}`);
            onClose()
          }

    } catch (error) {
      console.error(error);
    }
  });


  return (
    <Modal opened={opened} onClose={onClose} title="Update Profile Picture">
      <div className="flex justify-center items-center">{previews}</div>
      <form onSubmit={handleSubmit}>
        <Stack>
          <FileInput
          label="Select File"
          placeholder="Select file photo..."
            {...form.getInputProps("avatar")}
            onChange={handleAvatarChange}
          />
          <Button type="submit" className="bg-blue-600 text-white">
            Update Avatar
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
