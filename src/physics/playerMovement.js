import Matter from 'matter-js';

export function initMovement(sceneObjects, app, engine) {
    let moveRight = false;
    let moveLeft = false;
    let isJumping = false; // Флаг для отслеживания прыжка
    const spd = 5; // Скорость движения
    const jumpForce = 16; // Сила прыжка

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight' || event.key === 'd') {
            moveRight = true;
        } else if (event.key === 'ArrowLeft' || event.key === 'a') {
            moveLeft = true;
        } else if ((event.key === 'ArrowUp' || event.key === 'w' || event.key === ' ') && sceneObjects.catBody.isOnGround) {
            isJumping = true;
            sceneObjects.catBody.isOnGround = false;
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'ArrowRight' || event.key === 'd') {
            moveRight = false;
        } else if (event.key === 'ArrowLeft' || event.key === 'a') {
            moveLeft = false;
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Добавляем слушатель коллизий
    Matter.Events.on(engine, 'collisionStart', (event) => {
        const pairs = event.pairs;

        for (let i = 0, j = pairs.length; i != j; ++i) {
            let pair = pairs[i];

            // Если кот сталкивается с землей, разрешаем прыгать
            if ((pair.bodyA === sceneObjects.catBody && pair.bodyB.isStatic) ||
                (pair.bodyB === sceneObjects.catBody && pair.bodyA.isStatic)) {
                const normal = pair.collision.normal;
                // Проверяем, что столкновение происходит снизу
                if (normal.y < -0.8) {
                    sceneObjects.catBody.isOnGround = true;
                }
            }
        }
    });

    function playerMovement() {
        let velocityX = 0;

        if (moveRight) {
            velocityX += spd;
        }
        if (moveLeft) {
            velocityX -= spd;
        }

        // Прыжок
        if (isJumping) {
            Matter.Body.setVelocity(sceneObjects.catBody, { x: sceneObjects.catBody.velocity.x, y: -jumpForce });
            isJumping = false; // Сбрасываем флаг прыжка
        }

        Matter.Body.setVelocity(sceneObjects.catBody, { x: velocityX, y: sceneObjects.catBody.velocity.y });
    }

    return {
        update: () => {
            playerMovement();
        },
        cleanup: () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            // Удаляем слушатель коллизий
            Matter.Events.off(engine, 'collisionStart');
        }
    };
}