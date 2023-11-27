export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  mongo: process.env.MONGODB || 'mongodb://localhost:27017/my_app',
});
