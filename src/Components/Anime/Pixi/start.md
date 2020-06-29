## PIXI ##

> Adding Sprite
```javascript
    const image = 'some-url'
    const pixiApp = new PIXI.application({
        transparent: true,
        resolution: 1,
        width: 100,
        height: 100,
        antialias: true
    })

    const pixiLoader = new PIXI.Loader()
    const setup = () => {
        const texture = PIXI.texture.from(image)
        const sprite = new PIXI.sprite(texture)
        // sprite.x = 90
        // sprite.y = 90
        // sprite.position.set(90, 90)
        pixiApp.stage.addChild(sprite)
        sprite.x = pixiApp.renderer.width / 2;
        sprite.y = pixiApp.renderer.height / 2;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        pixiApp.stage.addChild(sprite)
        pixiApp.ticker.add(() => {
            sprite.rotation += 0.005
        })
    }

    pixiLoader
        .add(image)
        .load(setup)

```