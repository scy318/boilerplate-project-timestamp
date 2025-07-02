const express = require('express');
const app = express();
const PORT = 3000;

// 根路径
app.get('/', (req, res) => {
  res.send('Hello World!');  // 测试要求返回此内容
});

// 时间戳 API 路由
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  try {
    if (!dateParam) {
      date = new Date();  // 空参数返回当前时间
    } else if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam, 10));  // 处理 Unix 时间戳
    } else {
      date = new Date(dateParam);  // 处理日期字符串
    }

    if (isNaN(date.getTime())) {
      throw new Error('Invalid Date');  // 无效日期
    }

    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Date' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});