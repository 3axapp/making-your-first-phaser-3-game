import "./styles.scss";
import "phaser";
import {Game, Scene} from "phaser";
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;

var platforms: StaticGroup;

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
    }

    public update()
    {

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
