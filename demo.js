var createGame = require('voxel-engine')
var texturePath = require('painterly-textures')(__dirname)
var regionChange = require('./')

var container = document.querySelector('#container')
var voxelEl = document.querySelector('#voxel')
var chunkEl = document.querySelector('#chunk')

var game = createGame({
  startingPosition: [0, 500, 0],
  texturePath: texturePath
})

window.game = game // for debugging
game.controls.pitchObject.rotation.x = -1.5 // look down
game.appendTo(container)

container.addEventListener('click', function() {
  game.requestPointerLock(container)
})

game.region.on('voxel', function(pos) {
  voxelEl.innerHTML = JSON.stringify(pos)
})

game.region.on('chunk', function(pos) {
  chunkEl.innerHTML = JSON.stringify(pos)
})
