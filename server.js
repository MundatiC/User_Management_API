const express = require('express');
const { router } = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/', router);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: "Not found"
  });
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
