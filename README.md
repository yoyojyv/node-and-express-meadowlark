# Node And Express

'Web Development With Node And Express' Book Source

## ch04 ##

Use express generator

```
express meadowlark --hbs
```

```
cd meadowlark && npm install
```

## ch05 ##

Install Mocha

```
npm install --save-dev mocha
```

```
mkdir public/vendor
cp node_modules/mocha/mocha.js public/vendor
cp node_modules/mocha/mocha.css public/vendor
```

Install Chai

```
npm install --save-dev chai
cp node_modules/chai/chai.js public/vendor
```

Install Zombie

```
npm install --save-dev zombie
```

Test #1

```
mocha -u tdd -R spec qa/tests-crosspage.js 2>/dev/null
```

Test #2
```
mocha -u tdd -R spec qa/tests-unit.js 
```

JSHint (global) 

```
jshint app.js 
```

Install grunt 
```
npm install -g grunt-cli
npm install --save-dev grunt
```

Install grunt plugin
```
npm install --save-dev grunt-cafe-mocha
npm install --save-dev grunt-contrib-jshint
npm install --save-dev grunt-exec
```

Run Grunt
```
grunt
```

## ch06 ##

Disable Express X-Powered-by Header
```
app.disable('x-powered-by');
```

PASS~~

## ch07 ##

Not use 'express-handlebars' module instead **'hbs'** module  

section changed -> **extend, block**   

See [hbs helpers and partials](https://github.com/donpark/hbs#helpers-and-partials)
See [hbs extra scripts or styles](https://github.com/donpark/hbs#extra-scripts-or-styles)


## ch08 ##

Install body-parser (already installed)

```
npm install --save body-parser
```

Install Formidable (Multipart upload)

```

npm install --save formidable
```

Use jQuery File Upload

```
npm install --save jquery-file-upload-middleware
```



## ch09 ##

Create credentials.js file and edit 

```
module.exports = {
  cookieSecret: 'your cookie secret goes here',
};
```

Add credentials.js to your .gitignore file

Install cookie-parser middleware (already installed)
```
npm install --save cookie-parser
```

Set cookie-parser
```
app.use(cookieParser(credentials.cookieSecret));
```

Install express-session
```
npm install --save express-session
```