import Matter from 'matter-js';

export function initMovement(sceneObjects, app) {
    let moveRight = false;
    let moveLeft = false;
    let moveUp = false;
    let moveDown = false;
    const spd = 5; //  Скорость движения

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight' || event.key === 'd') {
            moveRight = true;
        } else if (event.key === 'ArrowLeft' || event.key === 'a') {
            moveLeft = true;
        } else if (event.key === 'ArrowUp' || event.key === 'w') {
            moveUp = true;
        } else if (event.key === 'ArrowDown' || event.key === 's') {
            moveDown = true;
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'ArrowRight' || event.key === 'd') {
            moveRight = false;
        } else if (event.key === 'ArrowLeft' || event.key === 'a') {
            moveLeft = false;
        } else if (event.key === 'ArrowUp' || event.key === 'w') {
            moveUp = false;
        } else if (event.key === 'ArrowDown' || event.key === 's') {
            moveDown = false;
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    function playerMovement() {
        if (moveRight) {
            Matter.Body.setVelocity(sceneObjects.catBody, { x: spd, y: sceneObjects.catBody.velocity.y });
        }
        if (moveLeft) {
            Matter.Body.setVelocity(sceneObjects.catBody, { x: -spd, y: sceneObjects.catBody.velocity.y });
        }
        if (moveUp) {
            // Здесь код для прыжка, который у вас был закомментирован.
            // Реализуйте его, если нужно, адаптировав под Matter.js.
        }
    }

    return {
        update: () => {
            playerMovement();
        },
        cleanup: () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    };
}