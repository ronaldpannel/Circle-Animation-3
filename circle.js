class Circle{
    constructor(effect){
        this.x = effect.width/2 
        this.y = effect.height/2
        this.radius = 270 
    }
    draw(ctx){
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        // ctx.stroke()
    }
}