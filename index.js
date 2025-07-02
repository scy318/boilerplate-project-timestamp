const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  let input = req.params.date;
  let date;

  // 处理空参数（返回当前时间）
  if (!input) {
    date = new Date();
  } 
  // 处理 Unix 时间戳（支持数字或字符串形式）
  else if (!isNaN(parseInt(input))) {
    date = new Date(parseInt(input));
  } 
  // 处理日期字符串（如 "2025-07-02"）
  else {
    date = new Date(input);
  }

  // 验证日期有效性
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  // 构造标准响应
  res.json({
    unix: date.getTime(),          // 确保是数字类型
    utc: date.toUTCString()        // 确保格式如 "Thu, 01 Jan 1970 00:00:00 GMT"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});