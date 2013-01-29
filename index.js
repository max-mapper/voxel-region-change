module.exports = coordinates
 
var aabb = require('aabb-3d')
var events = require('events')
 
function coordinates(spatial, box, cubeSize, chunkSize) {
  var emitter = new events.EventEmitter()
  var lastVoxel = [NaN, NaN, NaN]
  var thisVoxel
  var lastChunk = [NaN, NaN, NaN]
  var thisChunk

  if (arguments.length === 3) {
    chunkSize = cubeSize
    cubeSize = box
    box = aabb([-Infinity, -Infinity, -Infinity], [Infinity, Infinity, Infinity])
  }

  var chunkWidth = cubeSize * chunkSize

  spatial.on('position', box, function(pos) {
    updateVoxel(pos)
    updateChunk(pos)
  })
  
  function updateChunk(pos) {
    thisChunk = [Math.floor(pos.x / chunkWidth), Math.floor(pos.y / chunkWidth), Math.floor(pos.z / chunkWidth)]
    if (thisChunk[0] !== lastChunk[0] || thisChunk[1] !== lastChunk[1] || thisChunk[2] !== lastChunk[2]) {
      emitter.emit('chunk', thisChunk)
    }
    lastChunk = thisChunk
  }
  
  function updateVoxel(pos) {
    thisVoxel = [Math.floor(pos.x / cubeSize), Math.floor(pos.y / cubeSize), Math.floor(pos.z / cubeSize)]
    if (thisVoxel[0] !== lastVoxel[0] || thisVoxel[1] !== lastVoxel[1] || thisVoxel[2] !== lastVoxel[2]) {
      emitter.emit('voxel', thisVoxel)
    }
    lastVoxel = thisVoxel
  }
 
  return emitter
}