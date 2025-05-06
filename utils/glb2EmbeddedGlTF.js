const gltfPipeline = require("gltf-pipeline");
const fsExtra = require("fs-extra");
const glbToGltf = gltfPipeline.glbToGltf;
const glb = fsExtra.readFileSync("./models/Michelle.glb");
glbToGltf(glb).then(function (results) {
  fsExtra.writeJsonSync("./models/Michelle-embedded.gltf", results.gltf);
});