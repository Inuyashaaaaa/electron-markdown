import React from 'react';
import './App.css';

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
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
  return (
    <div className="container" >
      <div className="leftContainer">
        <div className="fileContainer">
          <FileSearch
            title="早上好"
            onFileSearch={() => { }}
          />
          <FileList 
            files={defaultFiles}
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
      <div className="docContainer"></div> 
    </div>
  );
}

export default App;
