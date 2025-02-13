import app from "./app";
import "module-alias/register";
const port = 3001;
app.listen(port || 3000, () => {
  console.log(`Server is running on http://localhost:${port || 3000}`);
});
