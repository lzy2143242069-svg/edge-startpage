/**
 * 快速链接管理模块
 */
class QuickLinks {
    constructor() {
        this.links = [];
        this.grid = document.getElementById('link-grid');
        this.addBtn = document.getElementById('add-link-btn');
        this.modal = document.getElementById('add-link-modal');
        
        this.init();
    }
    
    init() {
        this.loadLinks();
        this.render();
        this.bindEvents();
    }
    
    loadLinks() {
        // 从存储加载链接
        if (window.app && window.app.storage) {
            this.links = window.app.storage.getQuickLinks();
        } else {
            // 默认链接
            this.links = [
                { name: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'B' },
                { name: 'GitHub', url: 'https://www.github.com', icon: 'G' },
                { name: 'YouTube', url: 'https://www.youtube.com', icon: 'Y' },
                { name: '知乎', url: 'https://www.zhihu.com', icon: '知' }
            ];
        }
    }
    
    saveLinks() {
        if (window.app && window.app.storage) {
            window.app.storage.saveQuickLinks(this.links);
        }
    }
    
    render() {
        if (!this.grid) return;
        
        this.grid.innerHTML = '';
        
        this.links.forEach((link, index) => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'quick-link';
            linkElement.innerHTML = `
                <div class="link-icon">${link.icon}</div>
                <div class="link-title">${link.name}</div>
                <button class="link-delete" data-index="${index}">×</button>
            `;
            this.grid.appendChild(linkElement);
        });
    }
    
    bindEvents() {
        // 添加链接按钮
        if (this.addBtn) {
            this.addBtn.addEventListener('click', () => this.openModal());
        }
        
        // 关闭模态框
        const closeBtn = document.getElementById('close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        // 保存链接
        const saveBtn = document.getElementById('save-link');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveNewLink());
        }
        
        // 取消
        const cancelBtn = document.getElementById('cancel-link');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }
        
        // 删除链接
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('link-delete')) {
                e.preventDefault();
                const index = parseInt(e.target.dataset.index);
                this.deleteLink(index);
            }
        });
        
        // 壁纸模糊度滑块
        const blurSlider = document.getElementById('wallpaper-blur');
        if (blurSlider) {
            blurSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                document.getElementById('blur-value').textContent = `${value}px`;
                if (window.app && window.app.wallpaper) {
                    window.app.wallpaper.setBlur(value);
                }
            });
        }
    }
    
    openModal() {
        if (this.modal) {
            this.modal.style.display = 'block';
            document.getElementById('link-name').value = '';
            document.getElementById('link-url').value = '';
            document.getElementById('link-icon').value = '';
        }
    }
    
    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }
    
    saveNewLink() {
        const name = document.getElementById('link-name').value.trim();
        const url = document.getElementById('link-url').value.trim();
        const icon = document.getElementById('link-icon').value.trim();
        
        if (!name || !url) {
            alert('请填写网站名称和地址');
            return;
        }
        
        // 验证URL格式
        try {
            new URL(url);
        } catch (e) {
            alert('请输入有效的网站地址');
            return;
        }
        
        // 添加新链接
        this.links.push({
            name: name,
            url: url,
            icon: icon || name.charAt(0)
        });
        
        this.saveLinks();
        this.render();
        this.closeModal();
    }
    
    deleteLink(index) {
        if (index >= 0 && index < this.links.length) {
            if (confirm(`确定要删除 "${this.links[index].name}" 吗？`)) {
                this.links.splice(index, 1);
                this.saveLinks();
                this.render();
            }
        }
    }
}
