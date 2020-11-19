# Express Template

This is a ready to Use **Express API**

[Changelog](#changelog)

### Global Features

Branch  | Description | Status
------------- | ------------- | -------------
main  | Full api without datasource | 
mysql  | Datasource Mysql, simple code | Online
mysql+typetron  | Datasource Mysql + Typetron (ORM) | 
mysql-async  | Datasource mysql with async/await | 
mongo  | Datasource MongoDb | 
mongo-mysql  | Example with 2 differents datasources | 
mongo-socketio  | Datasource MongoDb and Socket.io | 
mysql-socketio  | Datasource Mysql and Socket.io | 

**- [PM2](https://pm2.keymetrics.io/) ready** 

**- Security :** Default security middlewares are use (read more about security links: [1](https://itnext.io/make-security-on-your-nodejs-api-the-priority-50da8dc71d68) [2](https://nodesource.com/blog/nine-security-tips-to-keep-express-from-getting-pwned) [3](https://www.freecodecamp.org/news/express-js-security-tips/))

**- Logging :** [Morgan](https://www.npmjs.com/package/morgan) + [Winston](https://www.npmjs.com/package/winston)

**- Auto-loaded Routes**

**- [JWT](https://www.npmjs.com/package/jsonwebtoken) authentification**

**- Environment based configuration :** see [config](https://www.npmjs.com/package/config)

**- UltraLight homemade Mysql ORM**

## Structure :
- **bin/**:
    -  **www**: http server (script to start)
- **config/**: configuration folder, the file will be selected in relation to the NODE_ENV, the default file will be selected if the file related to NODE_ENV does not exists.
    - **default.json**: Opposite than .env, config files will not contain sensitive data
    - **production.json**
    - **[test|development].json**
- **controllers/**
- **datasources/**: Connection to specific datasource
- **library/** contains specific libraries
- **logs/** 
- **middlewares/**
- **models/**
- **public/**
    - **uploads/**
- **routes/**
- **services/**: fetch data on external api/services
- **tmp/**
- **utils/**: specifics utils
- **app.js**
- **.env.example**: dont forget to duplicate this (.env)) 
- **pm2.json**: pm2 file to fill

## Functionalities guide

### pm2
[PM2 documentation](https://pm2.keymetrics.io/)

./pm2.json is the configuration file, you have to fill **name** and **logs names**

pm2 logs need a folder in /var/logs
`$ sudo mkdir /var/logs/pm2 && sudo chmod 777 /var/logs/pm2`

pm2 has to be installed globally
`$ sudo npm i -g pm2`

To start
`$ pm2 start pm2.json`

#### usage
list process:
`$ pm2 limit`

stop:
`$ pm2 stop <processID>`
or 
`$ pm2 stop <processName>`

restart:
`$ pm2 restart <processID>`
or 
`$ pm2 restart <processName>`

delete:
`$ pm2 delete <processID>`
or 
`$ pm2 delete <processName>`

**Real time monitoring:**

- full logs :
    `$ tail -fn 200 /var/logs/pm2/<your app>.out`
- errors :
    `$ tail -fn 200 /var/logs/pm2/<your app>-error.out`
    
    **200** is the number of line to display (log history);
    
## json web token
./library/JWT.js


## mysql
./library/Mysql.js

## logger
./library/logger.js

## config   
./config/


# Editor.md

![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)

![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)


**Table of Contents**

[TOCM]

[TOC]

#H1 header
##H2 header
###H3 header
####H4 header
#####H5 header
######H6 header
#Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")
##Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")
###Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")
####Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")
#####Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")
######Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")

##Headers (Underline)

H1 Header (Underline)
=============

H2 Header (Underline)
-------------

###Characters
                
----

~~Strikethrough~~ <s>Strikethrough (when enable html tag decode.)</s>
*Italic*      _Italic_
**Emphasis**  __Emphasis__
***Emphasis Italic*** ___Emphasis Italic___

Superscript: X<sub>2</sub>，Subscript: O<sup>2</sup>

**Abbreviation(link HTML abbr tag)**

The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.

###Blockquotes

> Blockquotes

Paragraphs and Line Breaks
                    
> "Blockquotes Blockquotes", [Link](http://localhost/)。


####Javascript　

```javascript
function test(){
	console.log("Hello world!");
}
 
(function(){
    var box = function(){
        return box.fn.init();
    };

    box.prototype = box.fn = {
        init : function(){
            console.log('box.init()');

			return this;
        },

		add : function(str){
			alert("add", str);

			return this;
		},

		remove : function(str){
			alert("remove", str);

			return this;
		}
    };
    
    box.fn.init.prototype = box.fn;
    
    window.box =box;
})();

var testBox = box();
testBox.add("jQuery").remove("jQuery");
```

####HTML code

```html
<!DOCTYPE html>
<html>
    <head>
        <mate charest="utf-8" />
        <title>Hello world!</title>
    </head>
    <body>
        <h1>Hello world!</h1>
    </body>
</html>
```
          
----

###Lists

####Unordered list (-)

- Item A
- Item B
- Item C
     
####Unordered list (*)

* Item A
* Item B
* Item C

####Unordered list (plus sign and nested)
                
+ Item A
+ Item B
    + Item B 1
    + Item B 2
    + Item B 3
+ Item C
    * Item C 1
    * Item C 2
    * Item C 3

####Ordered list
                
1. Item A
2. Item B
3. Item C
                
----
                    
###Tables
                    
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell 

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Function name | Description                    |
| ------------- | ------------------------------ |
| `help()`      | Display the help window.       |
| `destroy()`   | **Destroy your computer!**     |

| Item      | Value |
| --------- | -----:|
| Computer  | $1600 |
| Phone     |   $12 |
| Pipe      |    $1 |

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |
                
----





###GFM task list

- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2

    
-------------
#Changelog
<a name="changelog"></a>
