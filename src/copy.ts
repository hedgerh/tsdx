import * as fs from 'fs-extra';
import path from 'path';
import glob from 'tiny-glob';
import mkdirp from 'mkdirp';
import util from 'util';
import asyncro from 'asyncro';

async function copy(options: any) {
  await util.promisify(mkdirp)(options.dest);
  const files = await glob(options.src);
  await asyncro.map(files, async (file: string) => {
    await fs.copy(file, `${options.dest}/${path.basename(file)}`);
  });
}

export default function(options: any) {
  return {
    name: 'rollup-plugin-dts-copy',
    generateBundle() {
      copy(options);
    },
  };
}

//rgb(246, 246, 246)
// #FF8552
