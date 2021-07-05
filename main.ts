controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 3 1 3 2 . . . . . . 
        . . . . . 3 1 1 1 3 . . . . . . 
        . . . . . 3 1 1 1 3 . . . . . . 
        . . . . . 3 1 1 1 3 . . . . . . 
        . . . . . 3 1 1 1 2 . . . . . . 
        . . . . . 2 1 1 1 2 . . . . . . 
        . . . . . 2 3 1 3 2 . . . . . . 
        . . . . . . 3 1 3 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, ship, 0, -66)
    projectile.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    music.beamUp.play()
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    music.smallCrash.play()
    scene.cameraShake(4, 500)
    sprite.destroy()
    info.changeLifeBy(-1)
})
info.onLifeZero(function () {
    game.over(true)
})
let projectile2: Sprite = null
let projectile: Sprite = null
let ship: Sprite = null
info.setLife(3)
ship = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 3 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . 8 3 . . . . . . . 
    . . . . . . 8 8 1 a . . . . . . 
    . . . . . . 8 3 1 a . . . . . . 
    . . . . . c c c a a a . . . . . 
    . . . . 8 8 3 3 3 1 a a . . . . 
    . . 8 f f f c c a a f f a a . . 
    . 8 8 8 8 a a 3 3 3 3 1 3 a a . 
    8 8 8 8 8 8 a a 3 3 3 1 3 3 a a 
    8 8 8 8 8 8 a a 3 3 3 3 1 3 a a 
    `, SpriteKind.Player)
ship.y = 120
ship.setStayInScreen(true)
controller.moveSprite(ship, 100, 0)
let list = [img`
    ....................
    ..............555...
    ..............5.....
    .555.........5......
    ..55.........55.....
    ..5............5....
    ..5.....1551...5....
    ..5.....5555....5...
    ...55....44.....5...
    .....5..5555...5....
    ......555d55..55....
    .......5d555555.....
    .......d55555.......
    .......555555.......
    .......555555.......
    .......555555.......
    .......555555.......
    ........5555........
    ........4444........
    ....................
    `, img`
    ....................
    ..............cc....
    ..............cc....
    ..c...........cc....
    ..cc...........c....
    ..cc...........c....
    ..c....c1bb1c.cc....
    ..c.....cccc..c.....
    ..c.....cccc..c.....
    ..c......ff...cc....
    ..c......bf....c....
    ..c......bb.....c...
    ...c....bbbb....c...
    ....c..bbbbbb...c...
    .....ccccccccccc....
    .......cccccc.......
    .......cccccf.......
    ........cfff........
    ....................
    ....................
    `, img`
    ....................
    .......77...........
    ....7.c7c7.77.7.....
    ..77c77c666c67cc7...
    ...767777c776776c7..
    ..776c116677117677..
    ....76116c77117767..
    ....77777766c7677...
    ...7c77677e6777777..
    ..77677677677e6777..
    ..7666761111167767..
    .77777e7122217676...
    77..67ee776e76e677..
    77..6667676e77f.77..
    7..777.e766eff7..6..
    7..6....e6eee76...7.
    7..76.....6....6..6.
    77..6...77....7....6
    7..67...6.....76..7.
    ....................
    `]
game.onUpdateInterval(500, function () {
    projectile2 = sprites.createProjectileFromSide(list[randint(0, 2)], 0, 50)
    projectile2.setKind(SpriteKind.Enemy)
    projectile2.setFlag(SpriteFlag.AutoDestroy, true)
    projectile2.x = randint(0, 150)
})
