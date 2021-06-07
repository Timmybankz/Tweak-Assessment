const app = require('./index');
const port = process.env.PORT || 2500;

// Server
app.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});