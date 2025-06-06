import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { api } from './services/api'

function App() {
  const [count, setCount] = useState(0)
  const [apiInfo, setApiInfo] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [dbStatus, setDbStatus] = useState(null)
  const [dbError, setDbError] = useState(null)
  const currentEnv = import.meta.env.VITE_ENV || 'development'
  const apiUrl = import.meta.env.VITE_API_URL

  // 添加環境信息顯示組件
  const EnvironmentInfo = () => {
    // 根據環境設置顏色
    const getEnvironmentColor = () => {
      switch (currentEnv) {
        case 'production':
          return '#4CAF50';  // 生產環境使用綠色
        case 'staging':
          return '#FF9800';  // 測試環境使用橙色
        default:
          return '#2196F3';  // 開發環境使用藍色
      }
    };

    return (
      <div className="environment-info" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '10px',
        background: getEnvironmentColor(),
        color: 'white',
        textAlign: 'center',
        zIndex: 1000,
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        <div>當前環境: {currentEnv.toUpperCase()}</div>
        <div>API URL: {apiUrl || '使用默認配置'}</div>
        <div>連接狀態: {apiError ? '❌ 錯誤' : apiInfo ? '✅ 已連接' : '⏳ 連接中...'}</div>
      </div>
    );
  };

  useEffect(() => {
    // 獲取API信息
    const fetchApiInfo = async () => {
      try {
        console.log('正在連接 API...');
        console.log('當前環境:', currentEnv);
        console.log('API URL:', apiUrl);
        
        const info = await api.getRoot();
        console.log('API 響應:', info);
        setApiInfo(info);
        setApiError(null);
      } catch (error) {
        console.error('API 連接錯誤:', error);
        setApiError(error.message);
      }
    };

    // 獲取數據庫狀態
    const fetchDbStatus = async () => {
      try {
        console.log('測試數據庫連接...');
        const status = await api.testDatabase();
        console.log('數據庫響應:', status);
        setDbStatus(status);
        setDbError(null);
      } catch (error) {
        console.error('數據庫測試錯誤:', error);
        setDbError(error.message);
      }
    };

    fetchApiInfo();
    fetchDbStatus();
  }, []);

  return (
    <>
      <EnvironmentInfo />
      
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* API 狀態卡片 */}
      <div className="card" style={{ marginTop: '60px' }}>
        <h2>API 連接狀態</h2>
        {apiError ? (
          <div style={{ color: '#ff4444', marginBottom: '10px' }}>
            錯誤: {apiError}
          </div>
        ) : apiInfo ? (
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '5px',
            textAlign: 'left'
          }}>
            {JSON.stringify(apiInfo, null, 2)}
          </pre>
        ) : (
          <p>正在連接 API...</p>
        )}
      </div>

      {/* 數據庫狀態卡片 */}
      <div className="card">
        <h2>數據庫連接狀態</h2>
        {dbError ? (
          <div style={{ color: '#ff4444', marginBottom: '10px' }}>
            錯誤: {dbError}
          </div>
        ) : dbStatus ? (
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '5px',
            textAlign: 'left'
          }}>
            {JSON.stringify(dbStatus, null, 2)}
          </pre>
        ) : (
          <p>正在測試數據庫連接...</p>
        )}
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
