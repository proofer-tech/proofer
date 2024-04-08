"use client";
import { Avatar, AvatarProps, FileInput, FileInputProps } from "@mantine/core";
import React from "react";
interface ThumbnailFileInputProps {
  avatarProps?: AvatarProps;
  fileInputProps?: FileInputProps;
}
export default function ThumbnailFileInput({
  avatarProps,
  fileInputProps,
}: ThumbnailFileInputProps) {
  const [thumbnailSource, setThumbnailSource] = React.useState<string>("");
  const { onChange, ..._fileInputProps } = fileInputProps || {};

  return (
    <FileInput
      inputContainer={(fileInput) => {
        // @ts-ignore
        const fileProps = fileInput.props;
        return (
          <Avatar
            src={thumbnailSource || fileProps.__stylesApiProps.value}
            className={fileProps.className}
            onClick={fileProps.onClick}
            style={{ cursor: "pointer" }}
            {...avatarProps}
          />
        );
      }}
      {..._fileInputProps}
      onChange={(file) => {
        file && setThumbnailSource(URL.createObjectURL(file));
        return onChange?.(file);
      }}
    />
  );
}
