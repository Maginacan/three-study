const gltfPipeline = require("gltf-pipeline");
const fsExtra = require("fs-extra");
const processGltf = gltfPipeline.processGltf;
const gltf = fsExtra.readJsonSync("./models/Michelle.glb");
const options = {
  dracoOptions: {
    compressionLevel: 10,
  },
};
processGltf(gltf, options).then(function (results) {
  fsExtra.writeJsonSync("./models/Michelle-draco.gltf", results.gltf);
});