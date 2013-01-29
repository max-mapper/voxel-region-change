# voxel-region-change

get events when the player changes voxels or chunks

```
npm install voxel-region-change
```

## usage

```javascript
var regionChange = require('voxel-region-change')

regionChange(game.spatial, game.cubeSize, game.chunkSize)
  .on('voxel', function(pos) {
    console.log('voxel', pos) // e.g. [53, 12, -11]
  })
  .on('chunk', function(pos) {
    console.log('chunk', pos) // e.g. [0, 1, 0]
  })
  
```

## license

BSD