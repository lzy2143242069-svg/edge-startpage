/**
 * 本地存储模块
 */
class Storage {
    constructor() {
        this.storageKey = 'edge-startpage-settings';
    }
    
    getSettings() {
        try {
            const settings = localStorage.getItem(this.storageKey);
            return settings ? JSON.parse(settings) : this.getDefaultSettings();
        } catch (e) {
            console.error('读取设置失败:', e);
            return this.getDefaultSettings();
        }
    }
    
    saveSettings(settings) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(settings));
        } catch (e) {
            console.error('保存设置失败:', e);
        }
    }
    
    saveSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        this.saveSettings(settings);
    }
    
    getDefaultSettings() {
        return {
            theme: 'dark',
            timeFormat: '24',
            searchEngine: 'bing',
            wallpaperSource: 'local',
            quickLinks: [
                { name: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'B' },
                { name: 'GitHub', url: 'https://www.github.com', icon: 'G' },
                { name: 'YouTube', url: 'https://www.youtube.com', icon: 'Y' },
                { name: '知乎', url: 'https://www.zhihu.com', icon: '知' }
            ]
        };
    }
    
    getQuickLinks() {
        const settings = this.getSettings();
        return settings.quickLinks || this.getDefaultSettings().quickLinks;
    }
    
    saveQuickLinks(links) {
        this.saveSetting('quickLinks', links);
    }
}
