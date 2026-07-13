/**
 * 搜索引擎模块
 */
class Search {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.engineBtns = document.querySelectorAll('.engine-btn');
        this.currentEngine = 'bing';
        
        this.engines = {
            bing: {
                name: '必应',
                url: 'https://www.bing.com/search?q='
            },
            microsoft: {
                name: '微软',
                url: 'https://www.microsoft.com/en-us/search?q='
            },
            google: {
                name: '谷歌',
                url: 'https://www.google.com/search?q='
            },
            baidu: {
                name: '百度',
                url: 'https://www.baidu.com/s?wd='
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setEngine(this.currentEngine);
    }
    
    bindEvents() {
        // 搜索按钮点击事件
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => this.search());
        }
        
        // 回车搜索
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.search();
                }
            });
        }
        
        // 搜索引擎切换事件
        this.engineBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const engine = btn.dataset.engine;
                this.setEngine(engine);
            });
        });
    }
    
    setEngine(engine) {
        if (this.engines[engine]) {
            this.currentEngine = engine;
            
            // 更新按钮状态
            this.engineBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.engine === engine);
            });
            
            // 更新输入框占位符
            if (this.searchInput) {
                this.searchInput.placeholder = `在${this.engines[engine].name}中搜索...`;
            }
        }
    }
    
    search() {
        const query = this.searchInput.value.trim();
        if (query) {
            const url = this.engines[this.currentEngine].url + encodeURIComponent(query);
            window.location.href = url;
        }
    }
}
