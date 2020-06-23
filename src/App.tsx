import React, { useState } from 'react';
import './App.css';

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import FileTab from './components/FileTab'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button } from 'antd'
import { FileAddOutlined, CloudUploadOutlined } from '@ant-design/icons'

const defaultFiles = [{
  id: 1,
  title: 'first markdown first markdown first markdown first markdown',
  content: 'markdown content',
  createdAt: 1592796472063
}, {
  id: 2,
  title: 'second markdown',
  content: 'markdown content',
  createdAt: 1592796495383
}, {
  id: 3,
  title: 'third markdown',
  content: 'markdown content',
  createdAt: 1592796495383
}]

function App() {
  const [ files, setFiles ] = useState(defaultFiles)
  const [ activeFileID, setActiveFileID ] = useState('1')
  const [ unsavedFileIDs, setUnsavedFileIds ] = useState([])
  const [ openFileIds, setOpenFileIds ] = useState<string[]>(['1'])
  const openFiles = files.filter(file => openFileIds.includes(file.id.toString()))
  const activeFile = files.find(file => file.id.toString() === activeFileID)
  return (
    <div className="container" >
      <div className="leftContainer">
        <div className="fileContainer">
          <FileSearch
            title="早上好"
            onFileSearch={() => { }}
          />
          <FileList 
            files={files}
            onFileClick={id => console.log('click', id)}
            onFileDelete={id => console.log('delete', id)}
            onFileEdit={(id, newTitle) => console.log(id, newTitle)}
          />
        </div>
        <div className="bottom-btn-container">
          <Button 
            type="primary"
            icon={<FileAddOutlined />}
            size='middle'
            className="bottom-btn"
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
              onTabClick={id => console.log('click', id)}
              onTabClose={id => console.log('close', id)}
            />
            <SimpleMDE 
              value={activeFile && activeFile.content}
              onChange={value => console.log(value)}
            />
          </>
        }
      </div> 
    </div>
  );
}

export default App;
