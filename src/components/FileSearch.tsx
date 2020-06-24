import React, { FC, useState } from 'react'
import { Input } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
const { Search } = Input

interface FileSearchProps {
  onFileSearch?: (value: string) => void
  searchFiles: any
  setSearchedFiles?: any
}

const FileSearch: FC<FileSearchProps> = (props) => {
  const {
    onFileSearch,
    setSearchedFiles,
    searchFiles
  } = props
  const [ value, setValue ] = useState('')
  const handleSearch = (value: string) => {
    if (value === '') {
      setSearchedFiles()
    }
    else if (onFileSearch) {
      onFileSearch(value)
    }
  }
  const handleClick = () => {
    setValue('')
    setSearchedFiles()
  }
  const suffix = <CloseCircleOutlined style={{
    fontSize: '16px',
    visibility: searchFiles ? 'visible' : 'hidden'
  }} onClick={handleClick} />
  return (
    <>
      <Search
        onSearch={handleSearch}
        enterButton
        placeholder="search for file..."
        suffix={suffix}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  )
}

export default FileSearch
