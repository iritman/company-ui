import React from "react";
import { Form, Upload, Button, Progress, message } from "antd";
import { UploadOutlined as UploadIcon } from "@ant-design/icons";
import utils from "../../tools/utils";
import Words from "../../resources/words";

// const getUploadProps = (fieldName, formConfig) => {
//   let {
//     fileList,
//     setFileList,
//     record,
//     setRecord,
//     fileConfig,
//     loadFieldsValue,
//     formRef,
//   } = formConfig;
//   const { sizeType, maxFileSize } = fileConfig;

//   const props = {
//     onRemove: (file) => {
//       delete fileList[fieldName];
//       record[fieldName] = "";
//       setFileList(fileList);
//       setRecord(record);
//       // loadFieldsValue(formRef, record);
//     },
//     beforeUpload: (file) => {
//       const validFileSize =
//         file.size / 1024 / (sizeType === "mb" ? 1024 : 1) <= maxFileSize;

//       if (!validFileSize) {
//         message.error(Words.limit_upload_file_size);

//         //prevent auto upload
//         return false;
//       }

//       fileList[fieldName] = file;
//       record[fieldName] = file.name;

//       setFileList(fileList);
//       // loadFieldsValue(formRef, record);

//       //prevent auto upload
//       return false;
//     },
//     fileList: fileList[fieldName] ? [fileList[fieldName]] : [],
//   };

//   return props;
// };

const FileItem = ({
  title,
  fieldName,
  noLabel,
  required,
  horizontal,
  labelCol,
  formConfig,
  uploadProps,
  fileList,
}) => {
  const { errors, fileConfig } = formConfig;
  const { maxFileSize, sizeType } = fileConfig;

  // const props = getUploadProps(fieldName, formConfig);
  const props = uploadProps(fieldName, formConfig, fileList);

  let uploading = false;
  let uploadProgress = 0;

  const fileToUpload = fileList[fieldName];
  if (fileToUpload) {
    uploading = fileToUpload.uploading;
    uploadProgress = fileToUpload.uploadProgress;
  }

  return (
    <Form.Item
      labelCol={{ span: horizontal && horizontal !== false ? labelCol : 24 }}
      wrapperCol={{
        span: horizontal && horizontal !== false ? 24 - labelCol : 24,
      }}
      label={noLabel ? "" : title}
      name={fieldName}
      help={errors[fieldName]}
      hasFeedback
      required={required && required}
      validateStatus={
        errors[fieldName] === undefined
          ? ""
          : errors[fieldName] != null
          ? "error"
          : "success"
      }
      extra={utils.farsiNum(
        maxFileSize > 0
          ? Words.max_image_file_size_1 +
              maxFileSize +
              (sizeType === "kb"
                ? Words.max_image_file_size_2_kb
                : Words.max_image_file_size_2_mb)
          : Words.max_image_file_size
      )}
    >
      <Upload {...props}>
        <Button icon={<UploadIcon />}>{Words.select_file}</Button>
      </Upload>

      {uploading && <Progress percent={uploadProgress} size="small" />}
    </Form.Item>
  );
};

export default FileItem;
