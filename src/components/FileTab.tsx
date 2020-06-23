import React, { FC } from 'react'
import { Tabs } from 'antd'
import './FileTab.css'
const { TabPane } = Tabs

interface fileProps {
  id: number
  title: string
  content: string
  createdAt: number
}

interface FileTabProps {
  files: fileProps[]
  activeId?: string
  unsavedIds?: number[]
  onTabClick?: (id: number) => void
  onTabClose?: (id: number) => void
}

const FileTab: FC<FileTabProps> = (props) => {
  const {
    files,
    activeId,
    onTabClick,
    onTabClose
  } = props
  const handleChange = (activeKey: string) => {
    if (onTabClick) {
      onTabClick(parseInt(activeKey))
    }
  }
  const handleEdit = (e: any, action: 'remove' | 'add' ) => {
    if (action === 'remove' && onTabClose) {
      onTabClose(parseInt(e))
    }
  }
  return (
    <Tabs
      hideAdd
      onChange={handleChange}
      defaultActiveKey={activeId ? activeId : ''}
      type="editable-card"
      onEdit={handleEdit}
    >
      {files.map(file => (
        <TabPane tab={file.title} key={(file.id).toString()}>
        </TabPane>
      ))}
    </Tabs>
  )
}

FileTab.defaultProps = {
  unsavedIds: []
}

export default FileTab