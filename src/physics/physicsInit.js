import Matter from 'matter-js';

export function initPhysics(engine, sceneObjects) {
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    return {
        update: () => {
             // Синхронизация спрайта с физическим телом
             if (sceneObjects && sceneObjects.sprite && sceneObjects.catBody){
             sceneObjects.sprite.x = sceneObjects.catBody.position.x;
             sceneObjects.sprite.y = sceneObjects.catBody.position.y;
             sceneObjects.sprite.rotation = sceneObjects.catBody.angle;
             }
        }
    };
}