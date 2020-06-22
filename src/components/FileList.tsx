import React, { FC, useState, KeyboardEvent } from 'react'
import { List, Skeleton, Button, Input } from 'antd'
import './FileList.css'
import { EditOutlined, DeleteOutlined, FileMarkdownOutlined } from '@ant-design/icons'

interface fileProps {
  id: number
  title: string
  content: string
  createdAt: number
}

interface FileListProps {
  files: fileProps[]
  onFileClick?: (id: number) => void
  onFileDelete?: (id: number) => void
  onFileEdit?: (id: number, newTitle: string) => void
}

const FileList: FC<FileListProps> = (props) => {
  const [selectedId, setSelectedId] = useState(0)
  const [selectedTitle, setSelectedTitle] = useState('')
  const {
    files,
    onFileClick,
    onFileDelete,
    onFileEdit
  } = props
  const handleFileClick = (id: number) => {
    if (onFileClick) {
      onFileClick(id)
    }
  }
  const handleFileDelete = (id: number) => {
    if (onFileDelete) {
      onFileDelete(id)
    }
  }
  const handleFileEdit = (title: string, id: number) => {
    console.log(title, id)
    setSelectedId(id)
    setSelectedTitle(title)
  }
  const renderUnselectedJSX = (item: fileProps) => (
    <List.Item
      key={item.id}
      actions={[
        <Button
          type="link"
          icon={<EditOutlined />}
          size="small"
          onClick={() => handleFileEdit(item.title, item.id)}
        />,
        <Button
          type="link"
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleFileDelete(item.id)}
        />
      ]}
    >
      <Skeleton title={false} loading={false} active>
        <div className="fileItemContainer">
          <FileMarkdownOutlined style={{ fontSize: '16px' }} />
          <div title={item.title} className="fileItemTitle" onClick={() => handleFileClick(item.id)}>{item.title}</div>
        </div>
      </Skeleton>
    </List.Item>
  )

  const renderSelectedJSX = (item: fileProps) => {
    const handleFileEditBlur = () => {
      if (onFileEdit) {
        onFileEdit(item.id, selectedTitle)
      }
      setSelectedId(0)
    }
    const handleFileEditKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.keyCode) {
        case 13:
          if (onFileEdit) {
            onFileEdit(item.id, selectedTitle)
          }
          setSelectedId(0)
          break;
        case 27:
          if (onFileEdit) {
            onFileEdit(item.id, item.title)
          }
          setSelectedId(0)
          setSelectedTitle(item.title)
          break;
        default:
          break;
      }
    }
    return (
      <List.Item
        key={item.id}
      >
        <Skeleton title={false} loading={false} active>
          <div className="fileItemContainer">
            <FileMarkdownOutlined style={{ fontSize: '16px' }} />
            <Input
              autoFocus
              size="small"
              className="fileItemInput"
              defaultValue={item.title}
              onBlur={handleFileEditBlur}
              onKeyUp={handleFileEditKeyUp}
              onChange={(e) => setSelectedTitle(e.target.value)}
            />
          </div>
        </Skeleton>
      </List.Item>
    )
  }



  return (
    <div>
      <List
        loading={false}
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={files}
        renderItem={item => (
          <>
            {item.id === selectedId ? renderSelectedJSX(item) : renderUnselectedJSX(item)}
          </>
        )}
      />
    </div>
  )
}

export default FileList
