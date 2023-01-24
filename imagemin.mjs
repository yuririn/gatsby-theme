import * as fs from 'fs'

import imagemin from 'imagemin';

import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminGifsicle from 'imagemin-gifsicle';

const commonDir = process.cwd() + "/images/images/thumbnail/";

let imgDirs = fs.statSync(commonDir).isDirectory() ?
  fs.readdirSync(commonDir) : [];

imgDirs = imgDirs.filter(i => fs.statSync(commonDir +'/'+ i ).isDirectory())

;(async () => {
  if(imgDirs.length !== 0) {
    imgDirs.map(async (imgDir) => {
      const file = await imagemin([`./images/images/thumbnail/${imgDir}/*.{jpg,png}`], {
        destination: `./src/images/thumbnail/${imgDir}`,
        plugins: [
          imageminMozjpeg(),
          imageminPngquant({
            quality: [0.6, 0.8]
          }),
          imageminGifsicle(),
          imageminSvgo()
         ]
      })
    })
  }
})()
