const testFolder = './../../public/photos';
const fs = require('fs');

const fileList = [];
fs.readdirSync(testFolder).forEach(fileName => {
  fileName !== '.DS_Store' && fileList.push({
    src: `./photos/${fileName}`,
    title: fileName,
    width: 3,
    height: 3
  })
});

fs.writeFile('./photoList.json',  JSON.stringify(fileList, null, 2), 'utf8' ,function(err) {
  if(err) {
      return console.log(err);
  }
  console.log("The file was saved!");
}); 