const express = require('express');
const app = express();
const cors = require('cors');

// 启用 CORS
app.use(cors({ optionsSuccessStatus: 200 }));
// 静态文件目录
app.use(express.static('public'));

// 根路径返回 HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// 时间戳 API 核心逻辑
app.get('/api/:date?', (req, res) => {
  let inputDate = req.params.date;
  let date;

  // 处理空参数（返回当前时间）
  if (!inputDate) {
    date = new Date();
  } 
  // 处理 Unix 时间戳（纯数字）
  else if (!isNaN(parseInt(inputDate))) {
    date = new Date(parseInt(inputDate));
  } 
  // 处理日期字符串（如 "2025-07-02"）
  else {
    date = new Date(inputDate);
  }

  // 验证日期有效性
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  // 返回结果
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});