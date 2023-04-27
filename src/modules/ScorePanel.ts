
//创建记分牌类
class ScorePanel {
    //初始化分数和等级
    score = 0;
    level = 1;

    //分数和等级所在元素在构造函数中初始化
    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    //设置一个变量限制等级
    maxLevel:number;
    upScore:number;

    constructor(maxLevel:number = 10, upScore:number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    //设置分数增加函数
    scoreAdd() {
        this.scoreEle.innerHTML = ++this.score + '';
        //由于innerHTML是字符串类型，所以要进行类型转换
        if(this.score % this.upScore == 0) {
            this.levelUp();
        }
    }
    //设置等级晋升函数
    levelUp() {
        if(this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + '';
        }
    }

}

//测试代码
// const scorePanel = new ScorePanel(100,2);
// for(let i = 0; i < 200; i ++) {
//     scorePanel.scoreAdd();
// }


export default ScorePanel;

