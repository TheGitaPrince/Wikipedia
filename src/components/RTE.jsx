import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';

function RTE({
  label,
  name,
  control,
  defaultValue = ""
}) {
  return (
    <div className = "w-full mb-4">
      {label && <label>{label}</label>}
      <Controller
       name = {name}
       control = {control}
       render = {({field: {onChange}})=>(
        <Editor
        apiKey='7v9nwnadm63hhc4monn68b1bbg4zkwta7osku43k3apswrd1'
        initialValue={defaultValue}
        init={{
          initialValue: defaultValue,
          height: 300,
          menubar: true,
          plugins: [
              "image",
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "anchor",
          ],
          toolbar:
          "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
          content_style: "body { font-family:Helvetica, Arial, sans-serif; font-size:14px  }"
      }}
      onEditorChange={onChange}
        />
       )}
      />
    </div>
  )
}

export default RTE