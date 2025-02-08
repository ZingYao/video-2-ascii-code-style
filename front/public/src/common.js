// 几何形状组
const geometricSymbols = [
    '█', '▓', '▒', '░', '■', '□', '▢', '▣', '▤', '▥', '▦', '▧',
    '▨', '▩', '▪', '▫', '◼', '◻', '◾', '◽', '◦', '●', '○', '◌',
    '◍', '◎', '◯', '⚬', '∙', '·', '⋅', ' '
];

// 字母数字组
const alphanumericSymbols = [
    '@', '#', '8', 'B', '&', 'W', 'M', 'b', 'd', 'p', 'q', 'Q',
    'D', 'O', 'a', 'e', 'o', 'P', 'g', '9', '0', 'C', 'J', 'L',
    '7', 'T', 'c', 'v', 'n', 'r', '.', ' '
];

// 特殊字符组
const specialSymbols = [
    '✸', '✷', '✶', '✵', '✴', '✳', '✲', '✱', '✰', '✯', '✮', '✭',
    '✬', '✫', '✪', '✩', '✧', '✦', '★', '☆', '✿', '❀', '❁', '❂',
    '❃', '❇', '❈', '❉', '❊', '❋', '·', ' '
];

// 混合符号组
const mixedSymbols = [
    '█', '▓', '▒', '░', '▇', '▆', '▅', '▄', '▃', '▂', '▁', '◘',
    '◙', '◚', '◛', '◕', '◔', '◓', '◒', '◑', '◐', '☗', '☖', '☕',
    '♨', '♦', '♠', '♣', '♥', '♡', '•', ' '
];

// 渐变符号组
const gradualSymbols = [
    '█', '▓', '▒', '░', '▞', '▚', '▙', '▟', '▜', '▛', '▌', '▐', 
    '▄', '▀', '◘', '◙', '◚', '◛', '◕', '◔', '◑', '◒', '⦿', '◉', 
    '◎', '○', '∘', '∙', '·', '⋅', '˙', ' '
];



const utils = {
    getTimeFormat: function (date) {
        const pad = (num) => (num < 10 ? '0' + num : num);
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    appendLogRecord: function (message) {
        const logContent = document.querySelector('.log-content');
        const logLines = document.querySelector('.log-lines');
        const logArea = document.getElementById('logView');

        let logList = logContent.innerHTML.split('<br');
        let logNum = logList.length;
        let autoClear = false;
        if (logNum >= 200) {
            // 每当日志满200条时，删除前100条
            logContent.innerHTML = logList.slice(100).join('<br />\n');
            logNum = logContent.innerHTML.split('<br');
            autoClear = true;
        }
        logContent.innerHTML += `[${utils.getTimeFormat(new Date())}]:${message}<br />`;
        // 更新行号
        const lineCount = logContent.innerHTML.split('<br').length - 1;
        logLines.innerHTML = Array(lineCount).fill(0).map((_, i) => i + 1).join('<br />');

        // 滚动到底部
        logArea.scrollTop = logArea.scrollHeight;
        if (autoClear) {
            utils.appendLogRecord('日志超过200条，自动清除前100条');
        }
    },
    hiddenLog: function () {
        const displayLogBtn = document.getElementById('displayLog');
        const logView = document.getElementById('logView');
        const clearLogBtn = document.getElementById('clearLog');
        logView.style.display = 'none';
        clearLogBtn.style.display = 'none';
        displayLogBtn.innerText = '显示日志';
    },
    showLog: function () {
        const displayLogBtn = document.getElementById('displayLog');
        const logView = document.getElementById('logView');
        const clearLogBtn = document.getElementById('clearLog');
        logView.style.display = 'block';
        clearLogBtn.style.display = 'inline';
        displayLogBtn.innerText = '隐藏日志';
    },
    clearLog: function () {
        const logContent = document.querySelector('.log-content');
        logContent.innerHTML = '';
        const logLines = document.querySelector('.log-lines');
        logLines.innerHTML = '1<br />';
    },
    invertColor: function (hex) {
        // 移除可能存在的 '#' 符号
        hex = hex.replace('#', '');

        // 将十六进制转换为 RGB
        let r = parseInt(hex.substr(0, 2), 16);
        let g = parseInt(hex.substr(2, 2), 16);
        let b = parseInt(hex.substr(4, 2), 16);

        // 计算反色
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;

        // 转换回十六进制
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    imageToASCIICode: function (imgData, monochrome, style,customSymbols) {
        const frameBlob = new Blob([imgData.buffer], { type: 'image/jpeg' });

        const img = new Image();
        const imgUrl = URL.createObjectURL(frameBlob);
        img.src = imgUrl;

        return new Promise((resolve) => {
            img.onload = () => {
                let simpleSymbols = alphanumericSymbols;
                switch (style) {
                    case '几何形状':
                        simpleSymbols = geometricSymbols;
                        break;
                    case '字母数字':
                        simpleSymbols = alphanumericSymbols;
                        break;
                    case '特殊字符':
                        simpleSymbols = specialSymbols;
                        break;
                    case '混合符号':
                        simpleSymbols = mixedSymbols;
                        break;
                    case '渐变符号':
                        simpleSymbols = gradualSymbols;
                        break;
                        default:
                        simpleSymbols = customSymbols;
                        break;
                }
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                // 获取像素数据
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;

                let totalBrightness = 0;
                // 创建二维数组来存储亮度档位
                const brightnessLevels = Array(canvas.height).fill().map(() => Array(canvas.width).fill(0));
                const colorLevels = Array(canvas.height).fill().map(() => Array(canvas.width).fill(0));

                // 遍历像素并计算亮度档位
                for (let y = 0; y < canvas.height; y++) {
                    for (let x = 0; x < canvas.width; x++) {
                        const i = (y * canvas.width + x) * 4;
                        const r = pixels[i];
                        const g = pixels[i + 1];
                        const b = pixels[i + 2];

                        // 计算亮度 (使用人眼感知权重)
                        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

                        // 将亮度映射到 0-15 的档位
                        const level = Math.floor(brightness / simpleSymbols.length);
                        totalBrightness += brightness;
                        brightnessLevels[y][x] = Math.min(level, simpleSymbols.length - 1);
                        colorLevels[y][x] = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                    }
                }
                const averageBrightness = totalBrightness / (canvas.width * canvas.height);
                const asciiCanvas = document.createElement('canvas');
                const asciiCtx = asciiCanvas.getContext('2d');
                asciiCanvas.width = canvas.width * 10;
                asciiCanvas.height = canvas.height * 10;

                // 设置字体
                asciiCtx.font = '10px monospace';
                asciiCtx.textBaseline = 'center';
                asciiCtx.textBaseline = 'middle';
                let fontColor = 'white';
                let bgColor = 'black';
                if (averageBrightness > 255 * 0.58) {
                    fontColor = 'black';
                    bgColor = 'white';
                }

                for (let y = 0; y < brightnessLevels.length; y++) {
                    for (let x = 0; x < brightnessLevels[y].length; x++) {
                        const level = brightnessLevels[y][x];
                        const symbol = simpleSymbols[level];
                        if (!monochrome) {
                            if (averageBrightness > 255 * 0.58) {
                                // 反转色彩
                                fontColor = utils.invertColor(colorLevels[x][y]);
                            } else {
                                fontColor = colorLevels[y][x];
                            }
                        }
                        asciiCtx.fillStyle = bgColor;
                        asciiCtx.fillRect(x * 10, y * 10, 10, 10); x
                        asciiCtx.fillStyle = fontColor;
                        asciiCtx.fillText(symbol, x * 10 + 5, y * 10 + 5);
                    }
                }
                const playerCanvas = document.getElementById('progress');
                const playerCtx = playerCanvas.getContext('2d');
                // 设置页面 canvas 的尺寸以匹配 ASCII 艺术 canvas
                playerCanvas.width = asciiCanvas.width;
                playerCanvas.height = asciiCanvas.height;

                // 将 ASCII 艺术 canvas 的内容绘制到页面 canvas 上
                playerCtx.drawImage(asciiCanvas, 0, 0);
                URL.revokeObjectURL(imgUrl);
                asciiCanvas.toBlob((blob) => {
                    blob.arrayBuffer().then(buffer => {
                        const uint8Array = new Uint8Array(buffer);
                        resolve(uint8Array);
                    })
                }, 'image/jpeg');
            }
        }).finally(() => {
            URL.revokeObjectURL(imgUrl);
        });
    }

}
export default utils;