# Edge启动页

一个简洁、现代的Edge浏览器启动页，支持多搜索引擎、壁纸集成和个性化设置。

![Edge启动页预览](preview.png)

## ✨ 功能特点

- 🕒 **实时时钟** - 支持24小时制和12小时制切换
- 🔍 **多搜索引擎** - 支持必应、微软、谷歌、百度快速切换
- 🖼️ **壁纸集成** - 支持本地图片、Unsplash、必应每日壁纸、Wallpaper Engine
- ⚙️ **个性化设置** - 主题切换、时间格式、搜索引擎偏好
- 📱 **响应式设计** - 适配不同屏幕尺寸
- 💾 **本地存储** - 所有设置保存在浏览器本地
- 🚀 **快速加载** - 骨架屏加载，优化性能
- 🎨 **主题系统** - 深色/浅色主题，跟随系统设置

## 🚀 快速开始

### 作为Edge起始页使用

1. **下载项目**
   ```bash
   git clone https://github.com/你的用户名/edge-startpage.git
   ```

2. **在Edge中设置**
   - 打开Edge浏览器
   - 点击右上角 `...` 菜单
   - 选择 "设置" > "开始、主页和新建标签页"
   - 在 "Edge启动时打开" 部分，选择 "打开以下页面"
   - 添加本地文件路径或URL

3. **本地运行（推荐）**
   ```bash
   # 使用Python简单服务器
   python -m http.server 8000
   
   # 或者使用Node.js
   npx serve .
   
   # 然后访问 http://localhost:8000
   ```

### 作为新标签页扩展使用

1. 将项目打包为Edge扩展
2. 在Edge扩展管理页面加载解压缩的扩展
3. 启用扩展并设置为新标签页

## 📁 项目结构

```
edge-startpage/
├── index.html              # 主页面
├── css/
│   ├── style.css           # 主样式
│   ├── themes.css          # 主题变量
│   └── skeleton.css        # 骨架屏样式
├── js/
│   ├── app.js              # 主应用逻辑
│   ├── clock.js            # 时钟模块
│   ├── search.js           # 搜索引擎模块
│   ├── wallpaper.js        # 壁纸管理
│   ├── storage.js          # 本地存储
│   └── quicklinks.js       # 快速链接管理
├── assets/
│   ├── icons/              # 搜索引擎图标
│   └── wallpapers/         # 默认壁纸
├── README.md               # 项目文档
├── LICENSE                 # MIT许可证
└── .gitignore              # Git忽略文件
```

## ⚙️ 自定义设置

### 主题切换
- **深色主题**（默认）- 适合夜间使用
- **浅色主题** - 适合白天使用
- **跟随系统** - 自动适应系统主题

### 搜索引擎
- **必应**（默认）
- **微软**
- **谷歌**
- **百度**

### 壁纸来源
- **本地图片文件夹** - 使用本地图片
- **Unsplash** - 随机高质量图片
- **必应每日壁纸** - 每天更新的壁纸
- **Wallpaper Engine** - 集成Wallpaper Engine

### 时间格式
- **24小时制**（默认）
- **12小时制**

## 🛠️ 开发指南

### 添加新的搜索引擎

在 `js/search.js` 中的 `engines` 对象添加新引擎：

```javascript
engines: {
    // 现有引擎...
    newEngine: {
        name: '新引擎',
        url: 'https://example.com/search?q='
    }
}
```

### 添加新的壁纸来源

在 `js/wallpaper.js` 中添加新的加载方法：

```javascript
loadNewSource() {
    // 实现新壁纸来源逻辑
}
```

### 自定义主题

修改 `css/themes.css` 中的CSS变量：

```css
:root {
    --bg-primary: #your-color;
    --text-primary: #your-color;
    /* 更多变量... */
}
```

## 🤝 贡献指南

1. **Fork** 本项目
2. **创建**功能分支 (`git checkout -b feature/AmazingFeature`)
3. **提交**更改 (`git commit -m 'Add some AmazingFeature'`)
4. **推送**到分支 (`git push origin feature/AmazingFeature`)
5. **创建** Pull Request

### 贡献类型
- 🐛 Bug修复
- ✨ 新功能
- 📝 文档更新
- 🎨 UI/UX改进
- ⚡ 性能优化
- 🔧 代码重构

## 📋 开发路线图

- [ ] 添加模拟时钟样式
- [ ] 支持自定义CSS主题
- [ ] 添加天气小组件
- [ ] 支持多语言
- [ ] 添加快捷键支持
- [ ] 支持PWA安装
- [ ] 添加数据同步功能

## 🐛 问题反馈

如果你发现任何问题或有改进建议，请：

1. 查看 [Issues](https://github.com/你的用户名/edge-startpage/issues) 是否已有类似问题
2. 创建新的Issue，详细描述问题
3. 提供复现步骤和截图（如果可能）

## 📄 开源协议

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢所有贡献者
- 感谢开源社区的支持
- 特别感谢 [Unsplash](https://unsplash.com/) 提供的高质量图片

## 📞 联系方式

- **GitHub**: [你的GitHub用户名](https://github.com/你的用户名)
- **邮箱**: 你的邮箱@example.com
- **项目链接**: https://github.com/你的用户名/edge-startpage

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
