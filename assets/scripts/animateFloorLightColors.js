'use strict';

// The sumerian object can be used to access Sumerian engine
// types.
//
/* global sumerian */

// const sleep = (milliseconds) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedSetColor(color, delay, floorLight) {
	
	await sleep(delay);
	floorLight.setDiffuse(color);
	
}

async function setColor(color, delay, floorLights) {
	
	for (const floorLight of floorLights) {
		await delayedSetColor(color, delay, floorLight);
	}
	
}

// Called when play mode starts.
//
function setup(args, ctx) {
}

// When used in a ScriptAction, called when a state is entered.
// Use ctx.transitions.success() to trigger the On<State>Success transition
// and ctx.transitions.failure() to trigger the On<State>Failure transition
function enter(args, ctx) {
	
	setColor(args.color, args.delay, ctx.entityData.floorLights);
	
	ctx.transitions.success();

}

// When used in a ScriptAction, called when a state is exited.
//
function exit(args, ctx) {
}

// Called when play mode stops.
//
function cleanup(args, ctx) {
}

// Defines script parameters.
//
var parameters = [
    {type: 'int', control: 'slider', key: 'delay', 'default': 500, min: 0, max: 1000, exponential: false, description: 'delay (ms)'},
    {type: 'vec3', control: 'color', key: 'color', 'default': [0, 120, 255], description: 'RGB color input'},
	
];
