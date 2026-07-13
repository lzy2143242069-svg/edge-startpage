/**
 * 时钟模块
 */
class Clock {
    constructor() {
        this.timeElement = document.getElementById('time');
        this.dateElement = document.getElementById('date');
        this.format = '24'; // 默认24小时制
        this.interval = null;
    }
    
    start() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    setFormat(format) {
        this.format = format;
        this.update();
    }
    
    update() {
        const now = new Date();
        
        // 更新时间
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let period = '';
        
        if (this.format === '12') {
            period = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            if (hours === 0) hours = 12;
        }
        
        const timeString = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}${period}`;
        if (this.timeElement) {
            this.timeElement.textContent = timeString;
        }
        
        // 更新日期
        const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        
        const dateString = `${now.getFullYear()}年${months[now.getMonth()]}${now.getDate()}日 ${days[now.getDay()]}`;
        if (this.dateElement) {
            this.dateElement.textContent = dateString;
        }
    }
    
    padZero(num) {
        return num.toString().padStart(2, '0');
    }
}
