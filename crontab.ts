// site: https://crontab.guru/

import schedule from 'node-schedule';

// */15 * * * * * -> every 15 seconds
// */1 * * * * -> every minute
schedule.scheduleJob('*/1 * * * *', async () => {
  console.log('The answer to life, the universe, and everything!', new Date().toString());
});
