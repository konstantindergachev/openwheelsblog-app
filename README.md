# Open Wheels Blog is a dynamic site
> This site was written with Express.js framework.
> Site styles was written with SASS preprocessor [sass](https://sass-lang.com/), SCSS syntax.
> HTML layout was created with PUG preprocessor [pug](https://pugjs.org/api/getting-started.html).
> Website text is Russian.

- [Website](https://openwheelsblog.herokuapp.com/)

## Quick Start

# Step 1 Clone repo
```bash
git clone git@github.com:konstantindergachev/openwheelsblog-app.git
```
# Step 2 Install dependencies
```bash
yarn install -i or npm install
```
# Step 3 You need create a config file for data store. In my case, data stored in MongoDB Atlas:
[atlas mongodb](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_ukraine_search_brand_atlas_desktop&utm_term=atlas%20mongodb&utm_medium=cpc_paid_search&utm_ad=e&gclid=Cj0KCQjwzN71BRCOARIsAF8pjfjuKCd-lSDTTPHPaPCoosVA4owrFc-oxGKu21pZIAlVHHwedQCZM34aAl-DEALw_wcB),
and project hosting in Heroku:
[heroku](https://www.heroku.com/)
and images hosted in Cloudinary:
[cloudinary](https://cloudinary.com/).
In my application config file (config_dev.js) is app/server/config/config_dev.js directory:
```bash
module.exports = {
  localPort: '5000',
  herokuDepl:
    'mongodb://[your name]:[your password]@***************-*****-**-**-*****.mongodb.net:27017,***************-*****-**-**-*****.mongodb.net:27017,***************-*****-**-**-*****.mongodb.net:27017/*****?ssl=true&replicaSet=[name of cluster]-*****-*&**********=*****&***********=true',
    localUrl: '**************************',
    cloud_name: '**********',
    api_key: '****************',
    api_secret: '***************************',
};
```
# Step 4 Use your own social icons
# Step 5 Use your own favicon.ico:
```bash
app/public/favicon.ico
```
favicon directory:
```bash
app/public/img/favicon
```
# Step 6 Start this project on developer mode on localhost:5000
```bash
yarn run dev or npm run dev
```

# Procfile is a file for start project on production

## Info
### Author
Konstantin Dergachev [portfolio](http://dergachevkonstantin.surge.sh/)
