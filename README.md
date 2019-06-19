# dellivr-20190620

Intro to WebVR using Amazon Sumerian by [Kirby Shabaga](http://www.linkedin.com/in/kirbyshabaga)




## Amazon Sumerian inks

* [Amazon Sumerian Tutorials](https://docs.sumerian.amazonaws.com/tutorials/)
* [Amazon Sumerian YouTube](https://www.youtube.com/channel/UCm1ec-SgYpZO_4dCE_7h48g)
* [Amazon Sumerian Slack Channel](https://amazonsumerian.slack.com/join/shared_invite/enQtNTA1NjEyMTc4NTc2LThmZGVmMjhiN2ZjNDIzYzRjODQ0MTllNGY5ZGUxZjlhMDY3ZWNmNjA5ZjgzZDg3MzllZTU4M2FmNDQ2YTIxNDI)

## Reference and things to xperiment with

* [Portal Test Chamber 00](https://theportalwiki.com/wiki/Portal_Test_Chamber_00)
* [Poly by Google](https://poly.google.com/)
* [Blocks by Google](https://vr.google.com/blocks/)

## Attribution for assets

**Personal Use**

* [Color Palette](https://www.color-hex.com/color-palette/4521)
* [Portal Gun](https://free3d.com/3d-model/portal-gun-from-portal-2-74735.html)
* [Wall texture](http://vignette3.wikia.nocookie.net/vectronic/images/5/50/Wiki-background/revision/20150621173037)
* [Wall texture](http://vignette3.wikia.nocookie.net/vectronic/images/5/50/Wiki-background/revision/20150621173037)
* [Portal Button](https://free3d.com/3d-model/portal-button-65605.html)
* [Companion Cube](https://free3d.com/3d-model/companion-cubes-portal-8274.html)
* [Portal_2_soundtrack](https://theportalwiki.com/wiki/Portal_2_soundtrack) by the Portal Wiki is licensed under CC BY 4.0

## Area A - Description

A medium sized room with a radio, one light, and a poster on the wall with information about Test Chamber 00.

Seemingly, there is no way out.

Activating the Radio starts music playing...and a countdown timer.  When the timer runs to zero, a sliding door opens.

## 1.0 Add VR support to a scene

* New Empty Scene
* Import Assets
* VR Asset Pack
* Assets → Filter on Entities
* Add VRCameraRig to scene hierarchy
* **CurrentVRCameraRig** - verify that it is checked!

NOTE 1: CurrentVRCameraRig sometimes gets disabled (bug/feature!)

NOTE 2: We’ll be adding more to the VRCameraRig later

### Default Camera

* Follow Editor Camera: Uncheck
* Transform
  * Translation: (0, 2.0, 4)

## 1.1 Add Box

### Floor

* Name: Floor
* Transform: 10, 0.2, 10
* Translation: 0, -0.1, 0
* Material: dark grey

### Update Material

* Import Assets
* Search concrete
* Assets --> Filter on Materials
* Material: Concrete Polished
  * OPTIONAL (Experiment)
  * Color --> Edit
    * Placement --> (U, V) = (10, 10)
  * Normal --> Edit
    * Placement --> (U, V) = (10, 10)
  * Specular --> Edit
    * Placement --> (U, V) = (10, 10)

TIP: If you only have an image, you can try something like [NormalMap-Online](https://cpetry.github.io/NormalMap-Online/)

## 1.2 Add Script Component

* Custom Script
* Assets → Filter on Scripts
* Drag `vr_action_object_teleport` to Scripts component

## 1.3 Publish & Test

* The scene now supports teleportation :-)

NOTE: Copy the URL to bitly or a static page (easier to type into mobile browser)

### Share - <http://bit.ly/2x2rJHn>

## 1.4 Howto change the controller model

* From GitHub project
  * `assets/models/PortalGun`
* Drag PortalGun asset onto Scene
* Filter on Entities and Drag `gun` to the Scene
* `VRCameraRig > Tracker > controller_OQ_Right`
* Add as a child to the appropriate attach point: `attach_oculus_quest_right`

TIP: Raise the controller up a bit, so its not on the floor

### Transform and Materials

* `gun_root`
  * Uniform Scale: checked
  * Scale: (25, 25, 25)
  * Rotation: (0, -215, 0)

* `gun`
  * Translate: (0, 0, 10)

* `gun > gun_root > default_defaultMat`
* Drag `portalGunTexture` onto Color (DIFFUSE)
  * Turn Specular OFF
  * Experiment!

## 1.5 Add Walls

### Create Wall (North)

* Create Entity --> Box
* Name: Wall
  * Scale: (10, 4, 0.2)
    * Notice that it's halfway through the floor
  * Translate: (0, 2.5, -5.0)
  * Material: Concrete Panels
    * Update Color, Normal and Specular (2X1)
  * Add Component > Collider

TIP: Since I know I want to have physics enabled, and I know we will be duplicating this Entity we can save time by doing this now.

### Duplicate Wall - 2

* Translate: (-5, 2.5, 0)

### Duplicate Wall - 3

* Translate: (-2.5, 2, 0)
* Rotate: (0, 90, 0)

### Duplicate Wall - 4

* Translate: (5, 2.5, 0)
* Rotate: (0, 90, 0)

We have more to do.  We need a sliding door. How about bisecting `Wall 4` and then translating one half?

* Translate: (5, 2.5, 1.5)
* Scale: (7, 5, 0.2)

### Duplicate Wall 4 - 5

* Translate: (5, 2.5, -3)
* Scale: (3, 5, 0.2)

NOTE: We will use a State Machine to Tween Move Wall 5 to open the door.

## 1.6 Add Sound for door open and close

* Select `Wall 5`
  * Add Component: Sound
  * Drag `Portal2_sfx_door_open`
    * Disable AutoPlay
  * Drag `Portal2_sfx_door_close`
    * Disable AutoPlay

## 1.7 State Machine: Open Door A

* Select `Wall 5`
  * Add Component > State Machine
  * Name: Open DoorA

* State 1
  * Name: Listen openDoorA
  * Add Action: Listen
  * Channel: `openDoorA`

* State 2
  * Name: Open door with sound
  * Add Action: Play Sound
    * `Portal2_sfx_door_open`
  * Add Action: Tween Move
    * Translation: (0, 0, -2)
    * Relative: check
    * Time: 2
    * Easing Type: Exponential
    * Direction: Out

NOTE: We can test this outside of VR by making the second action the initial action.

## 1.8 State Machine: Close Door A

* State 1
  * Name: Listen closeDoorA
  * Add Action: Listen
    * Channel: `closeDoorA`

* State 4
  * Name: Close Door A
  * Add Action: Play Sound
    * `Portal2_sfx_door_close`
  * Add Action: Tween Move
    * Translation: (0, 0, 2)
    * Relative: check
    * Time: 1
    * Easing Type: Exponential
    * Direction: Out  

## 1.9 Add Ceiling - Disable while editing

* Duplicate Floor
* Name: Ceiling
* Translate: (0, 5, 0)
* Scale:(-10, 0.2, -10)
* Remove/Disable Scripts component
  * Experiment later if you like!

TIP: To change the direction of the normal, use a negative value.

## 1.10 Thinking ahead

Before we go further, let's stamp out Area B and Area C.

TIP: **DRY** Don't Repeat Yourself

### Create Entity > Empty

* Name: Area A
* Move everything except for the lights and cameras under Area A

### 2 x (Duplicate Area A)

Name: Area B

* Translate: (10, 0, 0)
* Rotate: (0, -90, 0)
* Disable/Delete `Wall 2`

Name: Area C

* Translate: (10, 0, 10)
* Disable or Delete `Wall`

## 1.11 Create Entity > Box

### A Box for our Radio to sit on

* Name: Shelf
* Translate:(-3, .1, -4)
* Scale:(2, 0.1, 1)
* Import Assets -> Material Metal
* Shelf -> Material
  * Currugated Metal Rust

### Add Component > Collider

TIP: If an entity has a Rigid Body then it will respond to gravity.  Adding a Collider to another entity will stop it from falling through it.

## 1.12 Create Entity > Box

### Add `portal-radio-a-prop`

* Child of Shelf
* Name: Radio
* Translate: (0, 1, 0)
* Rotation:(0, 0, 0)
* Scale: (0.25, 5, 0.5)

Q. What's up with our materal :-(

### Add textures to Radio

* Drag and drop from GitHub
  * `assets > models > portal-radio-a-prop > textures`
  * Color: Radio_Base_Color
  * Normal: Radio_Normal_DirectX
  * Emissive: Radio_Emissive

### Add Component > Sound

* Drop Sound > `Portal2_Sp_a2_laser_intro_b1`

TIP: Disable Autoplay

### Add Component > Script

* `vr_action_object_activate`
* Input: OnActionButtonDown
* Emit Message: playRadio

### Add Component > State Machine

* Name: Play Radio

* State 1: Listen playRadio
  * Listen: playRadio
* State 2: Play Radio
  * Play Sound: `Portal2_Sp_a2_laser_intro_b1`
* State 3: Emit openDoorA
  * Emit Message: openDoorA

## 1.13 Create Entity > Box

* Name: Cube
* Transform
  * Translate: (10, 0, 10)
* Material
* Script
  * Add `vr_action_object_grab`
* Collider
* Rigid Body

## 1.14 Add Lighting - depending on time

### Disable Default Lights

* Oh noes!

### Add Spot Light

* Transform
  * Translate: (0, 5, 0)
  * Rotation: (-90, 0, 0)
* Light
  * Type: Spot
  * Color: #0078ff

### State Machine

* Name: Focus Spotlight on Radio
* State 1
  * Name: Wait 5
  * Action: Wait
* State 2
  * Name: Focus Spotlight
  * Action: Tween LookAt
    * Position: -3, 0.1, -4
