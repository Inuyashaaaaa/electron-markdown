import React, { FC } from 'react'
import { Input } from 'antd'
const { Search } = Input

interface FileSearchProps {
  title: string
  onFileSearch: () => void
}

const FileSearch: FC<FileSearchProps> = (props) => {
  const handleSearch = () => {
    console.log('123')
  }
  return (
    <>
      <Search 
        onSearch={handleSearch}
        enterButton
        placeholder="search for file..."
      />
    </>
  )
}

export default FileSearch
