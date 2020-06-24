import React, { FC, useState, KeyboardEvent, ChangeEvent } from 'react'
import { List, Skeleton, Button, Input } from 'antd'
import './FileList.css'
import { EditOutlined, DeleteOutlined, FileMarkdownOutlined } from '@ant-design/icons'

interface fileProps {
  id: string
  title: string
  content: string
  createdAt: number
  isNew?: boolean
}

interface FileListProps {
  files: fileProps[]
  onFileClick?: (id: string) => void
  onFileDelete?: (id: string) => void
  onFileEdit?: (id: string, newTitle: string) => void
}

const FileList: FC<FileListProps> = (props) => {
  const [selectedId, setSelectedId] = useState('0')
  const [selectedTitle, setSelectedTitle] = useState('')
  const {
    files,
    onFileClick,
    onFileDelete,
    onFileEdit
  } = props
  const handleFileClick = (id: string) => {
    if (onFileClick) {
      onFileClick(id)
    }
  }
  const handleFileDelete = (id: string) => {
    if (onFileDelete) {
      onFileDelete(id)
    }
  }
  const handleFileEdit = (title: string, id: string) => {
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
      if (item.title.trim() === '' && item.isNew === true) {
        console.log('ok')
        handleFileDelete(item.id)
        return
      }
      if (item.isNew) {
        handleFileClick(item.id)
        delete item.isNew
      }
      if (onFileEdit) {
        onFileEdit(item.id, selectedTitle)
      }
      setSelectedId('0')
    }
    const handleFileEditKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.keyCode) {
        case 13:
          if (item.isNew && item.title.trim() !== '') {
            delete item.isNew
            handleFileClick(item.id)
          }
          if (onFileEdit) {
            onFileEdit(item.id, selectedTitle)
          }
          setSelectedId('0')
          break;
        case 27:
          if (onFileEdit) {
            onFileEdit(item.id, item.title)
          }
          setSelectedId('0')
          setSelectedTitle(item.title)
          break;
        default:
          break;
      }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedTitle(e.target.value)
      if (onFileEdit)
        onFileEdit(item.id, e.target.value)
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
              onChange={(e) => handleFileChange(e)}
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
            {item.id === selectedId || item.isNew ? renderSelectedJSX(item) : renderUnselectedJSX(item)}
          </>
        )}
      />
    </div>
  )
}

export default FileList
