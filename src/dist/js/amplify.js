

class Amplify{
    constructor(ele,imgArray){
        // 接收存储参数
        this.ele = ele;
        this.imgArray = imgArray;

        // 获取标签对象
        this.show = ele.querySelector('.show');
        this.mask = ele.querySelector('.mask');
        this.glass = ele.querySelector('.glass');
        this.img = this.show.querySelector('img');
        this.list = ele.querySelectorAll('.list li');
    }


    init(){
        this.overOut();
        this.move();
        this.toggle();
    }


    overOut(){
        // 移入
        this.show.addEventListener('mouseover' , ()=>{
            this.mask.style.display = 'block';
            this.glass.style.display = 'block';
        })
        // 移出
        this.show.addEventListener('mouseout' , ()=>{
            this.mask.style.display = 'none';
            this.glass.style.display = 'none';
        })
    }

    // 方法3,拖拽和放大镜移动
    move(){
        // 鼠标移动事件
        this.show.addEventListener('mousemove' , (e)=>{

            let x = e.clientX - this.ele.offsetLeft - this.ele.clientLeft - this.mask.clientWidth/2 ;
            let y = e.clientY - this.ele.offsetTop - this.ele.clientTop - this.mask.clientHeight/2 ;
            
            // 2,设定极值
            if(x < 0){
                x = 0;
            }

            if(y < 0){
                y = 0;
            }

            if(x > this.show.clientWidth - this.mask.clientWidth){
                x = this.show.clientWidth - this.mask.clientWidth;
            }

            if(y > this.show.clientHeight - this.mask.clientHeight){
                y = this.show.clientHeight - this.mask.clientHeight;
            }

            this.mask.style.left = x +'px';
            this.mask.style.top = y +'px';

            let bgX = 710 * x / 304; 
            let bgY = 710 * y / 304; 

            this.glass.style.backgroundPosition = `-${bgX}px -${bgY}px`;
            
        })
    }


    toggle(){

        this.list.forEach((item,key)=>{

            item.addEventListener('click' , ()=>{

                this.list.forEach((i)=>{
                    i.className = '';
                })

                item.className = 'active';
 
                this.img.src = this.imgArray[key];
                this.glass.style.background = `url(${this.imgArray[key]}) no-repeat 0 0`;
                this.glass.style.backgroundSize = '710px';
            })
        })
    }
}



