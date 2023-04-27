import Food from './Food'
import Snack from './Snack'
import ScorePanel from './ScorePanel';

//游戏控制类
class GameControl {
    food: Food;
    snack: Snack;
    ScorePanel: ScorePanel;

    //创建一个属性来存储蛇的移动方向，（也就是按键的方向）
    direction: string = "ArrowRight";

    //创建一个属性来记录游戏是否结束
    isLive:boolean = true;

    constructor() {
        this.food = new Food();
        this.snack = new Snack();
        this.ScorePanel = new ScorePanel();
        this.init();
    }

    //创建函数初始化,调用后函数即开始
    init() {
        //绑定键盘按键按下的事件
        document.addEventListener('keydown',this.keyDownHandle.bind(this));

        this.run();
    }

    //创建键盘按下的响应函数
    keyDownHandle(event: KeyboardEvent) {
         //修改direction
        // console.log(event.key);
        //  console.log(this);//document
         this.direction = event.key;
    }

    //创建蛇运动的函数
    run() {
        let X = this.snack.X;
        let Y = this.snack.Y;

        switch(this.direction) {
            //向上移动，top减少
            case "ArrowUp" :
                Y -= 10;
                break;
            //向下移动，top增加
            case "ArrowDown" :
                Y += 10;
                break;
            //向左移动，left减少
            case "ArrowLeft" :
                X -= 10;
                break;
             //向右移动，left增加
            case "ArrowRight" :
                X += 10;
                break;
        }

        //检查蛇是否吃到了食物
        this.checkEat(X,Y);

        //将修改后的值进行更新
        try {
            this.snack.X = X;
            this.snack.Y = Y;
        }catch(e) {
            //进入catch,出现异常，游戏结束
            alert(e +" GAME OVER！");
            //结束游戏
            this.isLive = false;
        }

        //在不按动键盘时让蛇自己走动
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.ScorePanel.level - 1) * 30);
    }

    //定义一个方法检查是否吃到食物
    checkEat(X:number, Y:number) {
        if(this.food.X == X && this.food.Y == Y) {
            //食物位置重置
            this.food.change();
            //分数加1
            this.ScorePanel.scoreAdd();
            //蛇的长度加一节
            this.snack.addBody();
        } 
    }
}

export default GameControl;