import * as PIXI from 'pixi.js';

export const initGraphics = (app) => {
    const renderer = app.renderer;
    renderer.resize(window.innerWidth, window.innerHeight);
    return renderer;
};