
module.exports = {
  webpack: {
    output: {
      publicPath: './', // 以保证资源路径正确。
    },    
    // devServer: {
    //   port: 3000,
    //   open: true,
    // },
  },
  theme: "./theme.less"
  // envs: {
  //   API: 'http://localhost',
  //   TEST: 'ss',
  // },  
};
