import "phaser";
import {Game, Scene} from "phaser";

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
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    public create()
    {
        this.add.image(400, 300, 'sky');
        this.add.image(400, 300, 'star');
    }

    public update()
    {

    }
}

const game = new Game({
    type  : Phaser.AUTO,
    width : 800,
    height: 600,
    scene : ExampleScene,
});
