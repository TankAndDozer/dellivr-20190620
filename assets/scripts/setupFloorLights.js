'use strict';

// The sumerian object can be used to access Sumerian engine
// types.
//
/* global sumerian */

// Called when play mode starts.
//
function setup(args, ctx) {
	
	ctx.entityData.floorLights = [];
	let coords = args.diskCoordinates;
	
	console.log(coords);
	
	for (var i in coords ) {
		
		// clone our reference entity
		var newDisk = sumerian.EntityUtils.clone(ctx.world, args.diskEntity);
		
		// set location for newDisk
		let t = new sumerian.Vector3( coords[i].x, coords[i].y, coords[i].z );
// 		console.log('t =', t);
 		newDisk.setTranslation(t);
		
		// add newDisk as a child, ignore world transform
		ctx.entity.attachChild(newDisk, false);

		// add newDisk to the world
		newDisk.addToWorld();
		
		// add disk to our array
		ctx.entityData.floorLights.push(newDisk);
		
	}

}

// Called when play mode stops.
//
function cleanup(args, ctx) {

	ctx.entity.removeFromWorld();
	ctx.entityData.floorLights = null;

}

// Defines script parameters.
//
var parameters = [
    {type: 'entity', key: 'diskEntity', description: 'Disk Entity'},
    {type: 'json', key: 'diskCoordinates', description: 'JSON with disk coordinates'},	
];
