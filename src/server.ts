import app from "./app";
const port = 3000;

app.listen(port || 3000, () => {
  console.log(`Server is running on http://localhost:${port || 3000}`);
});
