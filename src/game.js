import * as PIXI from 'pixi.js';
import { initGraphics } from './graphics/render.js';
import { log } from './utils/utils.js';
import Matter from 'matter-js';
import { setupScene } from './physics/sceneSetup.js';
import { initPhysics } from './physics/physicsInit.js';

export class Game {
    constructor() {
        log('Game constructor called');
        this.app = new PIXI.Application();
        this.initPixiApp().then(() => {
            this.loadResources().then(() => {
                // Создаем движок и мир
                this.matterEngine = Matter.Engine.create();
                this.world = this.matterEngine.world;

                this.renderer = initGraphics(this.app);

                // Настройка сцены
                this.sceneObjects = setupScene(this.app, this.catTexture, this.matterEngine);

                // Инициализация физики
                this.physicsUpdater = initPhysics(this.matterEngine, this.sceneObjects);

                // Добавляем функцию обновления физики в ticker (теперь обновляем через ticker Pixi)
                 this.app.ticker.add((delta) => {
                    if (this.physicsUpdater && this.physicsUpdater.update) {
                        this.physicsUpdater.update(delta);
                    }
                });

                // Пример добавления текста
                const text = new PIXI.Text('Hello from Game.js!', {
                    fontFamily: 'Arial',
                    fontSize: 24,
                    fill: 0xffffff,
                });
                text.anchor.set(0.5);
                text.x = this.app.renderer.width / 2;
                text.y = 50;
                this.app.stage.addChild(text);
            })
        });
    }

    async loadResources() {
        try {
            const catAsset = await PIXI.Assets.load('/cat.png');
            this.catTexture = catAsset;
            log('Resource loaded');

        } catch (error) {
            log(`Error loading resources: ${error}`);
        }
    }

    async initPixiApp() {
        await this.app.init({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x1099bb,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });
        log('PIXI Application initialized');

        this.gameContainer = document.createElement('div');
        this.gameContainer.id = 'game-container';
        document.body.appendChild(this.gameContainer);
        this.gameContainer.appendChild(this.app.canvas);
        log('Game container created and appended to DOM');
    }
}