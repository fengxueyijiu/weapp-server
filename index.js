let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let config = require('./config')
let axios = require('axios');

mongoose.connect('mongodb://localhost:27017/weapp-server');
app.use(bodyParser.json());
app.use(morgan('dev'));
app.post('/login',(req,res) => {
  // const queryString = `appid=${config.appId}&secret=${config.appSecret}&hs_cide=${req.body.code}&grant_type=authorization_code`
  // const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`;
  const queryString = `appid=${config.appId}&secret=${config.appSecret}&js_code=${req.body.code}&grant_type=authorization_code`;
  const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`
  axios.get(wxAPI)
       .then(response =>{
         console.log(response.data);
         res.json({
           message:'success!'
         })
       })
       .catch(error => {
         console.log(error)
       })
})
app.listen(3000,function(){
  console.log('your server is running on port 3000')
})
