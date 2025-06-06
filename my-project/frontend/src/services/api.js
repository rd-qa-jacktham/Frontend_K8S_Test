// 獲取 API URL，根據環境設置不同的地址
const getApiUrl = () => {
  // 從環境變量獲取 API URL
  const viteApiUrl = import.meta.env.VITE_API_URL;
  console.log('環境變量中的 API URL:', viteApiUrl);
  
  // 如果明確設置了 VITE_API_URL，使用它
  if (viteApiUrl) {
    console.log('使用環境變量中的 API URL:', viteApiUrl);
    return viteApiUrl;
  }
  
  // 否則根據環境自動設置
  const env = import.meta.env.VITE_ENV || 'development';
  console.log('當前環境:', env);
  
  // 所有環境統一使用 localhost:8000
  const apiUrl = 'http://localhost:8000';
  console.log('使用默認 API URL:', apiUrl);
  return apiUrl;
};

const API_URL = getApiUrl();

console.log('最終使用的 API URL:', API_URL);
console.log('當前環境:', import.meta.env.VITE_ENV);

// 添加通用的錯誤處理
const handleApiError = (error, endpoint) => {
  console.error(`API ${endpoint} error:`, error);
  if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
    throw new Error(`無法連接到 API 服務器 (${API_URL})`);
  }
  throw error;
};

export const api = {
  // 獲取API根信息
  getRoot: async () => {
    try {
      console.log('正在發送請求到:', `${API_URL}/`);
      const response = await fetch(`${API_URL}/`);
      if (!response.ok) {
        throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API 請求錯誤:', error);
      throw error;
    }
  },

  // 獲取配置信息
  getConfig: async () => {
    try {
      const response = await fetch(`${API_URL}/config`);
      if (!response.ok) {
        throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API 請求錯誤:', error);
      throw error;
    }
  },

  // 測試數據庫連接
  testDatabase: async () => {
    try {
      const response = await fetch(`${API_URL}/db-test`);
      if (!response.ok) {
        throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API 請求錯誤:', error);
      throw error;
    }
  }
}; 