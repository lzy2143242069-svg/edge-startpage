/**
 * 壁纸管理模块
 */
class Wallpaper {
    constructor() {
        this.currentSource = 'local';
        this.wallpaperElement = null;
        this.blurValue = 0;
        this.init();
    }
    
    init() {
        // 创建壁纸背景元素
        this.wallpaperElement = document.createElement('div');
        this.wallpaperElement.className = 'wallpaper';
        document.body.prepend(this.wallpaperElement);
        
        // 加载默认壁纸
        this.loadDefault();
    }
    
    setSource(source) {
        this.currentSource = source;
        this.change();
    }
    
    setBlur(value) {
        this.blurValue = value;
        if (this.wallpaperElement) {
            this.wallpaperElement.style.filter = `blur(${value}px)`;
        }
    }
    
    change() {
        switch (this.currentSource) {
            case 'local':
                this.loadLocal();
                break;
            case 'unsplash':
                this.loadUnsplash();
                break;
            case 'bing':
                this.loadBingDaily();
                break;
            case 'wallpaper-engine':
                this.loadWallpaperEngine();
                break;
            default:
                this.loadDefault();
        }
    }
    
    loadLocal() {
        // 本地壁纸加载逻辑
        // 这里可以添加本地文件夹扫描功能
        console.log('加载本地壁纸');
        this.loadDefault();
    }
    
    loadUnsplash() {
        // Unsplash API集成
        // 需要API密钥，这里使用随机图片作为示例
        const width = window.innerWidth;
        const height = window.innerHeight;
        const url = `https://source.unsplash.com/random/${width}x${height}`;
        this.setBackground(url);
    }
    
    loadBingDaily() {
        // 必应每日壁纸
        // 这里使用必应壁纸API
        const url = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
        // 注意：实际使用需要处理CORS问题
        console.log('加载必应每日壁纸');
        this.loadDefault();
    }
    
    loadWallpaperEngine() {
        // Wallpaper Engine API集成
        // 这需要本地服务器支持
        console.log('加载Wallpaper Engine壁纸');
        this.loadDefault();
    }
    
    loadDefault() {
        // 默认渐变背景
        this.wallpaperElement.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        this.wallpaperElement.style.backgroundImage = 'none';
    }
    
    setBackground(imageUrl) {
        this.wallpaperElement.style.backgroundImage = `url(${imageUrl})`;
        this.wallpaperElement.style.background = 'none';
    }
}
