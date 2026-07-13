/**
 * Edge启动页主应用逻辑
 */
class EdgeStartpage {
    constructor() {
        this.init();
    }
    
    init() {
        // 初始化各个模块
        this.clock = new Clock();
        this.search = new Search();
        this.wallpaper = new Wallpaper();
        this.storage = new Storage();
        this.quickLinks = new QuickLinks();
        
        // 加载用户设置
        this.loadSettings();
        
        // 绑定事件
        this.bindEvents();
        
        // 启动时钟
        this.clock.start();
        
        console.log('Edge启动页初始化完成');
    }
    
    loadSettings() {
        const settings = this.storage.getSettings();
        
        // 应用主题
        if (settings.theme) {
            document.documentElement.setAttribute('data-theme', settings.theme);
            const themeSelect = document.getElementById('theme-select');
            if (themeSelect) themeSelect.value = settings.theme;
        }
        
        // 应用时间格式
        if (settings.timeFormat) {
            this.clock.setFormat(settings.timeFormat);
            const timeFormatSelect = document.getElementById('time-format');
            if (timeFormatSelect) timeFormatSelect.value = settings.timeFormat;
        }
        
        // 应用搜索引擎设置
        if (settings.searchEngine) {
            this.search.setEngine(settings.searchEngine);
            const defaultSearchEngine = document.getElementById('default-search-engine');
            if (defaultSearchEngine) defaultSearchEngine.value = settings.searchEngine;
        }
        
        // 应用壁纸设置
        if (settings.wallpaperSource) {
            this.wallpaper.setSource(settings.wallpaperSource);
            const wallpaperSource = document.getElementById('wallpaper-source');
            if (wallpaperSource) wallpaperSource.value = settings.wallpaperSource;
        }
        
        // 应用壁纸模糊度
        if (settings.wallpaperBlur) {
            this.wallpaper.setBlur(settings.wallpaperBlur);
            const blurSlider = document.getElementById('wallpaper-blur');
            if (blurSlider) {
                blurSlider.value = settings.wallpaperBlur;
                document.getElementById('blur-value').textContent = `${settings.wallpaperBlur}px`;
            }
        }
    }
    
    bindEvents() {
        // 设置按钮事件
        const settingsBtn = document.getElementById('settings-btn');
        const settingsPanel = document.getElementById('settings-panel');
        const closeSettings = document.getElementById('close-settings');
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                settingsPanel.classList.toggle('open');
            });
        }
        
        if (closeSettings) {
            closeSettings.addEventListener('click', () => {
                settingsPanel.classList.remove('open');
            });
        }
        
        // 主题切换事件
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                const theme = e.target.value;
                document.documentElement.setAttribute('data-theme', theme);
                this.storage.saveSetting('theme', theme);
            });
        }
        
        // 时间格式切换事件
        const timeFormatSelect = document.getElementById('time-format');
        if (timeFormatSelect) {
            timeFormatSelect.addEventListener('change', (e) => {
                const format = e.target.value;
                this.clock.setFormat(format);
                this.storage.saveSetting('timeFormat', format);
            });
        }
        
        // 壁纸来源切换事件
        const wallpaperSource = document.getElementById('wallpaper-source');
        if (wallpaperSource) {
            wallpaperSource.addEventListener('change', (e) => {
                const source = e.target.value;
                this.wallpaper.setSource(source);
                this.storage.saveSetting('wallpaperSource', source);
            });
        }
        
        // 壁纸控制按钮事件
        const wallpaperChange = document.getElementById('wallpaper-change');
        if (wallpaperChange) {
            wallpaperChange.addEventListener('click', () => {
                this.wallpaper.change();
            });
        }
        
        const wallpaperSettings = document.getElementById('wallpaper-settings');
        if (wallpaperSettings) {
            wallpaperSettings.addEventListener('click', () => {
                // 打开设置面板并滚动到壁纸设置
                settingsPanel.classList.add('open');
                const wallpaperSection = document.querySelector('.settings-section:nth-child(3)');
                if (wallpaperSection) {
                    wallpaperSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        // 数据管理按钮事件
        const exportBtn = document.getElementById('export-settings');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportSettings());
        }
        
        const importBtn = document.getElementById('import-settings');
        if (importBtn) {
            importBtn.addEventListener('click', () => this.importSettings());
        }
        
        const resetBtn = document.getElementById('reset-settings');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSettings());
        }
    }
    
    exportSettings() {
        const settings = this.storage.getSettings();
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'edge-startpage-settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    importSettings() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const settings = JSON.parse(event.target.result);
                    this.storage.saveSettings(settings);
                    this.loadSettings();
                    alert('设置导入成功！');
                } catch (error) {
                    alert('导入失败：文件格式不正确');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    resetSettings() {
        if (confirm('确定要重置所有设置吗？这将清除所有自定义配置。')) {
            localStorage.removeItem(this.storage.storageKey);
            location.reload();
        }
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EdgeStartpage();
});
