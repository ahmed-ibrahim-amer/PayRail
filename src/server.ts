import { app } from './app.js';
import { env } from './config/env.js';
import {logger} from '../src/common/logger.js';
const PORT = env.PORT;

app.listen(PORT, () => {
   logger.info(`Server running on http://localhost:${PORT}`);
});