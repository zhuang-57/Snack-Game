class Snack {
    //设置蛇的容器
    element: HTMLElement;
    //设置蛇头
    head: HTMLElement;
    //设置装蛇身体的容器
    bodies: HTMLCollection;

    

    constructor() {
        this.element = document.getElementById('snack')!;
        this.head = document.querySelector('#snack > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div')!;
    }

    //蛇头的位置
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    //修改蛇头的坐标
    set X(value : number) {
        //如果X值没有变化，直接返回
        if(this.X == value) {
            return;
        }

        //如果X在0-290范围内，即可执行，否则蛇撞墙了，运行结束
        if(value < 0 || value> 290) {
            //进入判断，蛇撞墙了
            throw new Error("蛇撞墙了") ;
        }

        //修改X时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            //如果发生了掉头，让他往反方向移动（掉头无效）
            if(value > this.X) {
                //如果value>X,则蛇在向右走，此时发生掉头，应该让蛇继续向左走
                value = this.X - 10;
            }else {
                //相反
                value = this.X + 10;
            }
        }

        //移动蛇的身体
        this.moveBody();

       //改变蛇头的位置
        this.head.style.left = value + 'px';

        //判断是否撞到自己的身体
        this.checkHeadBody();
    }
    set Y(value : number) {
        //如果Y值没有变化，直接返回
        if(this.Y == value) {
            return;
        }
        //如果X在0-290范围内，即可执行，否则蛇撞墙了，运行结束
        if(value < 0 || value > 290) {
            throw new Error("蛇撞墙了") ;
        }

         //修改Y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            //如果发生了掉头，让他往反方向移动（掉头无效）
            if(value > this.Y) {
                //如果value>X,则蛇在向右走，此时发生掉头，应该让蛇继续向左走
                value = this.Y - 10;
            }else {
                //相反
                value = this.Y + 10;
            }
        }

        //移动蛇的身体
        this.moveBody();

       //改变蛇头的位置
        this.head.style.top = value + 'px';

        //判断是否撞到自己的身体
        this.checkHeadBody();

    }

    //增加蛇的身体长度
    addBody() {
        //向element中添加div  添加一段html代码，在结束标签之前的位置， 添加一个div
        this.element.insertAdjacentHTML('beforeend','<div></div>');
    }

    //移动蛇的身体
    moveBody() {
        //从后往前进行变换
        for(let i = this.bodies.length - 1; i > 0 ; i--) {
            //先获取到前一个值
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            //将这个值赋值到前一个的位置
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    //处理当蛇的头撞身体时结束游戏
    checkHeadBody() {
        for(let i = 1; i < this.bodies.length; i++) {
            let bd = (this.bodies[i] as HTMLElement);
            let X = bd.offsetLeft;
            let Y = bd.offsetTop;
            if(X == this.X && Y == this.Y) {
                throw new Error("撞到自己啦~~");
            }
        }
    }

}

export default Snack;