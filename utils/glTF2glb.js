const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const gltf2Glb = gltfPipeline.gltfToGlb;
const gltf = fsExtra.readJsonSync('./models/Michelle-embedded.gltf');
const options = {
    resourceDirectory: './models/'
}

gltf2Glb(gltf, options).then(function(results) {
    fsExtra.writeFileSync('Michelle.glb', results);
})