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