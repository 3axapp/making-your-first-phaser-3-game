import "phaser";
import {Game, Scene} from "phaser";
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import Group = Phaser.GameObjects.Group;
import SpriteWithStaticBody = Phaser.Types.Physics.Arcade.SpriteWithStaticBody;

var platforms: StaticGroup;
var player: SpriteWithDynamicBody;
var cursors: CursorKeys;
var stars: Group;

class ExampleScene extends Scene
{
    public preload()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            {frameWidth: 32, frameHeight: 48}
        );
    }

    public create()
    {
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key      : 'left',
            frames   : this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat   : -1
        });

        this.anims.create({
            key      : 'turn',
            frames   : [{key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key      : 'right',
            frames   : this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat   : -1
        });

        this.physics.add.collider(player, platforms);

        cursors = this.input.keyboard!.createCursorKeys();

        stars = this.physics.add.group({
            key   : 'star',
            repeat: 11,
            setXY : {x: 12, y: 0, stepX: 70}
        });

        stars.children.iterate(function (child: SpriteWithStaticBody)
        {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        } as any);

        this.physics.add.collider(stars, platforms);

        this.physics.add.overlap(player, stars, collectStar as any, undefined, this);
    }

    public update()
    {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }
}

const game = new Game({
    type   : Phaser.AUTO,
    width  : 800,
    height : 600,
    scene  : ExampleScene,
    physics: {
        default: 'arcade',
        arcade : {
            gravity: {y: 300, x: 0},
            debug  : false
        }
    },
});

function collectStar (player: SpriteWithDynamicBody, star: SpriteWithStaticBody)
{
    star.disableBody(true, true);
}
