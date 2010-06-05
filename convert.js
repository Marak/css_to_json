var sys = require('sys');
var less = require('./less.js/lib/less/');
var fs = require('fs');

// read behave directory and grab all behaviors
var cssFiles = paths('./examples/css/');
//sys.puts(JSON.stringify(cssFiles));
var code = '';

for(var file in cssFiles){
   var x = cssFiles[file];
   if(x.substr(x.length-4,4) == '.css'){ // if this is a css file
     var fileContents = fs.readFileSync(cssFiles[file], encoding='utf8');
     //docs.behave += "<li>"+docFilter(behaves[behave])+"</li>";
     code += (fileContents + '\n\n');
   }
   else{
     //code += (fileFilter(cssFiles[file]) + ' = {};' + '\n\n');
   }

 }

//sys.puts(code);

less.render(".main h1 {height:20px;width:20px;}", function (e, css, json_stylesheet) {
    sys.puts(css); // .class { width: 20px }
});

function fileFilter(txt){
   /*
   txt = txt.replace(/\.\//g, '');
   txt = txt.replace(/\//g, '.');
   txt = txt.replace(/\.js/, '');
   txt = txt.replace(/\.index/, '');
   */
   return txt;
 }

// Recursively traverse a hierarchy, returning a list of all relevant .js files.
 function paths(dir) {
     var paths = [];

     try { fs.statSync(dir) }
     catch (e) { return [] }

     (function traverse(dir, stack) {
         stack.push(dir);
         fs.readdirSync(stack.join('/')).forEach(function (file) {
             var path = stack.concat([file]).join('/'),
                 stat = fs.statSync(path);

             if (file[0] == '.' || file === 'vendor') {
                 return;
             } else if (stat.isFile() && /\.css$/.test(file)) {
                 paths.push(path);
             } else if (stat.isDirectory()) {
                 paths.push(path);
                 traverse(file, stack);
             }
         });
         stack.pop();
     })(dir || '.', []);

     return paths;
 }