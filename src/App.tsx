import React, { useState } from 'react';
import './App.css';

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import FileTab from './components/FileTab'
import SimpleMDE from "react-simplemde-editor";
import { v4 as uuidv4 } from 'uuid';
import "easymde/dist/easymde.min.css";
import { Button } from 'antd'
import { FileAddOutlined, CloudUploadOutlined } from '@ant-design/icons'

interface fileProps {
  id: string
  title: string
  content: string
  createdAt: number
  isNew?: boolean
}

const defaultFiles = [{
  id: '1',
  title: 'first markdown first markdown first markdown first markdown',
  content: 'markdown content1',
  createdAt: 1592796472063
}, {
  id: '2',
  title: 'second markdown',
  content: 'markdown content2',
  createdAt: 1592796495383
}, {
  id: '3',
  title: 'third markdown',
  content: 'markdown content3',
  createdAt: 1592796495383
}]

function App() {
  const [ files, setFiles ] = useState<fileProps[]>(defaultFiles)
  const [ activeFileID, setActiveFileID ] = useState('')
  const [ unsavedFileIDs, setUnsavedFileIds ] = useState<string[]>([])
  const [ openFileIds, setOpenFileIds ] = useState<string[]>([])
  const [ searchedFiles, setSearchedFiles ] = useState<fileProps[]>()
  console.log('openFileIds', openFileIds)
  const openFiles: fileProps[] = []
  for (let id of openFileIds) {
    const file = files.find(file => file.id === id)
    if (file) {
      openFiles.push(file)
    }
  }
  const activeFile = files.find(file => file.id.toString() === activeFileID)
  const handleFileClick = (id: string) => {
    setActiveFileID(id)
    if (!openFileIds.includes(id)) {
      setOpenFileIds([...openFileIds, id])
    }
  }
  const handleTabClick = (id: string) => {
    setActiveFileID(id)
  }
  const handleTabClose = (id: string) => {
    const filterFiles = openFileIds.filter(fileID => id !== fileID)
    setOpenFileIds(filterFiles)
    if (id === activeFileID) {
      setActiveFileID(filterFiles[0] || '')
      return
    }
  }
  const handleMDEChange = (val: string, id: string) => {
    setFiles(files.map(file => {
      if (file.id.toString() === id) {
        file.content = val
      }
      return file
    }))
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIds([...unsavedFileIDs, id])
    }
  }
  const handleFileDelete = (id: string) => {
    setFiles(files.filter(file => file.id.toString() !== id))
    handleTabClose(id)
  }
  const handleFileEdit = (id: string, newTitle: string) => {
    setFiles(files.map(file => {
      if (file.id.toString() === id) {
        file.title = newTitle
      }
      return file
    }))
  }
  const handleFileSearch = (value: string) => {
    setSearchedFiles(files.filter(file => file.title.includes(value)))
  }
  const handleNewBtnClick = () => {
    setFiles([...files, {
      id: uuidv4(),
      title: '',
      content: '## print something',
      createdAt: Date.now(),
      isNew: true
    }])
  }
  const showFiles = searchedFiles ? searchedFiles : files
  return (
    <div className="container" >
      <div className="leftContainer">
        <div className="fileContainer">
          <FileSearch
            onFileSearch={handleFileSearch}
            setSearchedFiles={setSearchedFiles}
            searchFiles={searchedFiles}
          />
          <FileList 
            files={showFiles}
            onFileClick={handleFileClick}
            onFileDelete={handleFileDelete}
            onFileEdit={handleFileEdit}
          />
        </div>
        <div className="bottom-btn-container">
          <Button 
            type="primary"
            icon={<FileAddOutlined />}
            size='middle'
            className="bottom-btn"
            onClick={handleNewBtnClick}
          >
            新建
          </Button>
          <Button 
            type="dashed"
            icon={<CloudUploadOutlined />}
            size='middle'
            className="bottom-btn"
          >
            导入
          </Button>
        </div>
      </div>
      <div className="docContainer">
        {
          !activeFile &&
          <div className="startPage">
            <span>choose a file to start</span>
          </div>
        }
        {
          activeFile &&
          <>
            <FileTab
              files={openFiles}
              activeId={activeFileID}
              onTabClick={handleTabClick}
              onTabClose={handleTabClose}
            />
            <SimpleMDE
              key={activeFile.id}
              value={activeFile.content}
              onChange={value => handleMDEChange(value, activeFileID)}
            />
          </>
        }
      </div> 
    </div>
  );
}

export default App;
