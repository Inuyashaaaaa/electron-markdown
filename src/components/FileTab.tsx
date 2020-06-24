import React, { FC } from 'react'
import { Tabs } from 'antd'
import './FileTab.css'
const { TabPane } = Tabs

interface fileProps {
  id: string
  title: string
  content: string
  createdAt: number
  isNew?: boolean
}

interface FileTabProps {
  files: fileProps[]
  activeId?: string
  unsavedIds?: number[]
  onTabClick?: (id: string) => void
  onTabClose?: (id: string) => void
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
      onTabClick(activeKey)
    }
  }
  const handleEdit = (e: any, action: 'remove' | 'add' ) => {
    if (action === 'remove' && onTabClose) {
      onTabClose(e)
    }
  }
  return (
    <Tabs
      hideAdd
      onChange={handleChange}
      activeKey={activeId}
      type="editable-card"
      onEdit={handleEdit}
    >
      {files.map(file => (
        <TabPane tab={file.title} key={file.id}>
        </TabPane>
      ))}
    </Tabs>
  )
}

FileTab.defaultProps = {
  unsavedIds: []
}

export default FileTab