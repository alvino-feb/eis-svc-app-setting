import { ENV } from './src/common/constants/env.js';

import app from "./src/app.js";

const PORT = ENV.PORT || 4200;

app.listen(PORT, () => {
  console.log(`Service app-setting running on port ${PORT}`);
});