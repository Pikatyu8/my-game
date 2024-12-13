import * as PIXI from 'pixi.js';
import { log } from '../utils/utils.js';
import Matter from 'matter-js';

export function setupScene(app, catTexture, engine) {
    // Настройка гравитации
    engine.world.gravity.y = 1; // Сила гравитации по оси Y

    const sprite = PIXI.Sprite.from(catTexture);
    sprite.anchor.set(0.5);

    // Начальное положение спрайта (чтобы было видно падение)
    sprite.x = app.renderer.width / 2;
    sprite.y = 100;

    app.stage.addChild(sprite);

    log(`Sprite added: width=${sprite.width}, height=${sprite.height}`);

    // Создание физического тела для спрайта (прямоугольник)
    const catBody = Matter.Bodies.rectangle(
        sprite.x,
        sprite.y,
        sprite.width,
        sprite.height,
        {
            restitution: 0.5 // Коэффициент отскока (0 - 1)
        }
    );
    Matter.World.add(engine.world, catBody);

    // Добавляем невидимые границы мира, чтобы кот не улетал за пределы экрана
    const ground = Matter.Bodies.rectangle(app.renderer.width / 2, app.renderer.height - 10, app.renderer.width, 20, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(0, app.renderer.height / 2, 10, app.renderer.height, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(app.renderer.width, app.renderer.height / 2, 10, app.renderer.height, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(app.renderer.width/2, 10, app.renderer.width, 20, { isStatic: true });
    Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // Создаем графические объекты для стен
    const wallGraphics = new PIXI.Graphics();
    wallGraphics.beginFill(0x00FF00); // Зеленый цвет

    // Рисуем стены с учетом их ширины и высоты
    wallGraphics.drawRect(ground.position.x - app.renderer.width / 2, ground.position.y - 10, app.renderer.width, 20); // Пол
    wallGraphics.drawRect(leftWall.position.x, leftWall.position.y - app.renderer.height / 2, 10, app.renderer.height); // Левая стена
    wallGraphics.drawRect(rightWall.position.x - 10, rightWall.position.y - app.renderer.height / 2, 10, app.renderer.height); // Правая стена
    wallGraphics.drawRect(ceiling.position.x - app.renderer.width / 2, ceiling.position.y - 10, app.renderer.width, 20); // Потолок

    wallGraphics.endFill();

    app.stage.addChild(wallGraphics);

    return {
        catBody,
        sprite,
        wallGraphics
    };
}