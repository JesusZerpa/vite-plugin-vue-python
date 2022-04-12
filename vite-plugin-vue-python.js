const { basename, join } = require('path')
const fs = require('fs')

module.exports = (options = {}) => {

  const { targets = [], hook = 'buildStart',interpreter="python" } = options
  return {
    name: 'python-vue',
    [hook]: async() => {

      /*
      const { exec } = require("child_process");
      exec(`/home/zerpa/anaconda3/envs/metaverse/bin/python -c "import vbuild; vbuild.build()"`, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
      });
      */
    },

  transform(src, id) {

    const { execSync } = require("child_process");
    if (id.endsWith(".vue")){
      let stdout=execSync(`${interpreter} -c "import vbuild; vbuild.build('${id}')"`).toString()
      
      return {
        code:stdout
      }
    }
    if (id.endsWith(".py")){
      let stdout=execSync(`${interpreter} -c "import vbuild; vbuild.src_py2js('${id}')"`).toString()
      console.log("uuuuu",stdout)
      return {
        code:stdout
      }
    }
    else{
      //console.log("aaaaaaaa",id)
    }
  }
  
} 
}
