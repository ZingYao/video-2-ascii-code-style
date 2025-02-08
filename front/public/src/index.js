import { FFmpeg } from '@ffmpeg/ffmpeg';
import 'xy-ui';
import xyMessage from 'xy-ui/components/xy-message';
import utils from './common';
import coreUrl from "@ffmpeg/core?url";
import wasmUrl from '@ffmpeg/core/wasm?url';
import { fetchFile } from '@ffmpeg/util';

const { appendLogRecord } = utils;




document.addEventListener('DOMContentLoaded', () => {
    const chooseVideoBtn = document.getElementById('chooseVideo'); // 选择视频按钮
    const convertBtn = document.getElementById('convertBtn'); // 转换按钮
    const displayLogBtn = document.getElementById('displayLog'); // 显示隐藏日志按钮
    const logView = document.getElementById('logView'); // 日志区域
    const clearLogBtn = document.getElementById('clearLog'); // 清空日志按钮
    const fpsRadio = document.getElementById('fps'); // 帧率选择框
    const styleRadio = document.getElementById('style'); // 样式选择框
    const fpsDefaultSwitchRadio = document.getElementById('fpsDefaultSwitch'); // 默认选中的帧率选择框
    const styleDefaultSwitchRadio = document.getElementById('styleDefaultSwitch'); // 默认选中的样式选择框
    const progressView = document.getElementById('progress');
    const player = document.getElementById('player');
    const colorfulSwitch = document.getElementById('colorfulSwitch');
    const customDiv = document.getElementById('customView');
    const customSymbolsInput = document.getElementById('customSymbols');
    const inputCountSpan = document.getElementById('inputCount');
    let chooseVideoFile = null; // 选择的视频文件
    let displayLogView = false; // 是否显示日志区域
    let fileList = [];
    let videoFps = 0;
    let videoUrl = '';
    let step = '';

    customSymbolsInput.onchange = (event)=> {
        inputCountSpan.innerText = event.currentTarget.value.length;
    }

    styleRadio.onchange = (event) => {
        if (event.detail.value == '自定义符号') {
            // 显示自定义符号输入框
            customDiv.style.display = 'block';
        } else {
            // 隐藏自定义符号输入框
            customDiv.style.display = 'none';
        }
    }



    // 设置默认选中状态
    styleDefaultSwitchRadio.checked = true;
    fpsDefaultSwitchRadio.checked = true;

    // 实例化FFmpeg 对象
    const ffmpeg = new FFmpeg();
    // 监听ffmpeg的log事件，输出到日志区域
    ffmpeg.on('log', ({ message }) => {
        appendLogRecord(`${step}:ffmpeg:${message}`);
        // 判断message是不是30/1格式 
        if (message.includes('/')) {
            // 获取帧率
            let temp = message.split('/');
            if (temp.length != 2) {
                return;
            }
            if (!parseInt(temp[0]) || !parseInt(temp[1])) {
                return;
            }
            videoFps = parseInt(parseInt(temp[0]) / parseInt(temp[1]));
        }
    });

    // 清空日志按钮事件
    clearLogBtn.addEventListener('click', () => {
        utils.clearLog();
    });

    // 显示隐藏日志按钮事件
    displayLogBtn.addEventListener('click', () => {
        displayLogView = !displayLogView;
        if (displayLogView) {
            utils.showLog();
        } else {
            utils.hiddenLog();
        }
    });

    // 选择视频按钮事件
    chooseVideoBtn.addEventListener('click', async (event) => {
        try {
            // 显示文件选择框
            const [fileHandle] = await window.showOpenFilePicker({
                types: [
                    {
                        description: '请选择视频文件',
                        accept: {
                            'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'], // 仅允许选择如上格式视频
                        }
                    }
                ],
                multipe: false // 不允许多选
            });
            // 获取被选中的文件
            chooseVideoFile = await fileHandle.getFile();
            if (chooseVideoFile) {
                convertBtn.disabled = false;
            }
            appendLogRecord(`选择视频文件:${chooseVideoFile.name}`);
        } catch (e) {
            // 一般是用户取消选择
            appendLogRecord(`选择视频文件失败:${e}`);
        } finally {
            // 不论结果如何都开启日志区域
            displayLogView = true; // 选择文件默认开启日志区域
            utils.showLog();
        }
    });
    convertBtn.addEventListener('click', async (event) => {
        const colorful = colorfulSwitch.checked
        const style = styleRadio.value;
        let customSymbols = [];
        if (style == '自定义符号') {
            customSymbols = customSymbolsInput.value.split('');
            if (customSymbols.length < 4 || customSymbols.length > 256 || !(256 % customSymbols.length)) {
                xyMessage.error('自定义符号不合法');
                appendLogRecord('自定义符号不合法');
                return;
            }
        }
        if (!chooseVideoFile) {
            xyMessage.error('请选择视频文件');
            appendLogRecord('请选择视频文件');
            return;
        }

        // 设置按钮不可点击
        convertBtn.disabled = true;
        player.style.display = 'none';

        displayLogView = true;
        player.pause();
        try {
            URL.revokeObjectURL(videoUrl);
        } catch (e) { }
        utils.showLog();
        try {
            // 基础路径定义
            const basePath = '/source';
            const videoPath = `${basePath}/${chooseVideoFile.name}`;
            const audioPath = `${basePath}/audio.mp3`;
            const imgPath = `${basePath}/tempImg`;
            const asciiImgPath = `${basePath}/asciiImg`;

            // 停止进程避免多个任务同时执行
            ffmpeg.terminate();
            if (!ffmpeg.loaded) {
                appendLogRecord('初始化ffmpeg库');
                await ffmpeg.load({
                    coreURL: coreUrl,
                    wasmURL: wasmUrl,
                });
            }
            appendLogRecord('删除临时文件夹');
            try {
                await ffmpeg.deleteDir(basePath);
            } catch (e) { }
            appendLogRecord('创建临时文件夹');
            await ffmpeg.createDir(basePath);
            appendLogRecord('创建图片文件夹');
            await ffmpeg.createDir(imgPath);
            appendLogRecord(`加载文件:${chooseVideoFile.name},到ffmpeg`);
            await ffmpeg.writeFile(videoPath, await fetchFile(chooseVideoFile));

            appendLogRecord(`提取视频帧率信息`);
            step = '获取视频帧信息';
            // 获取视频fps
            await ffmpeg.ffprobe([
                '-v', 'error',
                '-select_streams', 'v:0',
                '-show_entries', 'stream=r_frame_rate',
                '-of', 'default=noprint_wrappers=1:nokey=1',
                videoPath
            ])

            appendLogRecord(`视频fps:${videoFps}`);
            // 计算最低帧率
            let lowFps = 0;
            let midFps = 0;
            let maxFps = 0;
            for (let i = 3; i <= videoFps; i++) {
                if (!lowFps) {
                    if (videoFps % i == 0) {
                        lowFps = i;
                        i = parseInt(videoFps / 4) - 1;
                    }
                } else if (!midFps) {
                    if (videoFps % i == 0) {
                        midFps = i;
                        i = parseInt(videoFps / 2) - 1;
                    }
                } else if (!maxFps) {
                    if (videoFps % i == 0) {
                        maxFps = i;
                    }
                } else {
                    break;
                }
            }
            while (!videoFps);

            // 先确认选择的fps
            let fps = '10';
            switch (fpsRadio.value) {
                case '低':
                    fps = String(lowFps);
                    break;
                case '高':
                    fps = String(maxFps);
                    break;
                case '中':
                default:
                    fps = String(midFps);
                    break;
            }

            appendLogRecord(`按${fps}帧提取视频每帧图片`);
            step = '提取视频帧图片';
            await ffmpeg.exec(['-i', videoPath, '-r', fps, '-vf', 'scale=100:-1', '-v', 'info', imgPath + '/img_%05d.jpg']);
            appendLogRecord(`提取视频帧完成`);
            appendLogRecord(`提取视频音频文件`);
            step = '提取视频音频文件';
            await ffmpeg.exec(['-i', videoPath, '-vn', '-acodec', 'libmp3lame', audioPath]);
            appendLogRecord(`提取视频音频文件完成`);

            progressView.style.display = 'block';
            appendLogRecord(`开始处理图片数据`);
            appendLogRecord('图片处理进度0.01%');
            const list = await ffmpeg.listDir(imgPath);
            const imgCount = list.length - 2;
            await ffmpeg.createDir(asciiImgPath);
            for (let i = 2; i < list.length; i++) {
                if (!(i % parseInt(fps) * 5)) {
                    appendLogRecord(`图片处理进度${(i / imgCount * 100).toFixed(2)}%`)
                }
                const imgData = await ffmpeg.readFile(`${imgPath}/${list[i].name}`);
                // 将图片数据转换为ASCII码
                const asciiImgData = await utils.imageToASCIICode(imgData, !colorful, style,customSymbols);
                await ffmpeg.writeFile(`${asciiImgPath}/${list[i].name}`, asciiImgData);
            }
            appendLogRecord('图片处理进度100%');
            progressView.style.display = 'none';

            // 重新合成视频
            appendLogRecord('重新合成视频');
            step = '重新合成视频';
            await ffmpeg.exec([
                '-framerate', fps,
                '-i', `${asciiImgPath}/img_%05d.jpg`,
                '-i', audioPath,
                '-c:v', 'libx264',
                '-pix_fmt', 'yuv420p',
                '-c:a', 'aac',
                '-b:a', '192k',
                '-shortest', // 使用最短的输入流长度
                '-r', fps.toString(), // 输出帧率
                `${basePath}/output.mp4`
            ]);
            appendLogRecord('视频合成完成');
            // 生成视频blob 以及url
            const videoData = await ffmpeg.readFile(`${basePath}/output.mp4`);
            const videoBlob = new Blob([videoData.buffer], { type: 'video/mp4' });
            videoUrl = window.URL.createObjectURL(videoBlob);
            // 播放视频
            appendLogRecord('开始播放视频');
            displayLogView = false;
            utils.hiddenLog();
            player.style.display = 'block';

            // 移除所有现有的子元素
            while (player.firstChild) {
                player.removeChild(player.firstChild);
            }

            const sourceDom = document.createElement('source');
            sourceDom.src = videoUrl;
            sourceDom.type = 'video/mp4';
            player.appendChild(sourceDom);

            player.load();
            player.play();
        } catch (e) {
            if (String(e).indexOf('RuntimeError: memory access out of bounds') > -1) {
                appendLogRecord(`转换异常:换一个小一点的视频或者切换帧率再试`);
                xyMessage.error('转换异常:换一个小一点的视频或者切换帧率再试');
            } else {
                appendLogRecord('转换异常:' + e);
                xyMessage.error('转换异常');
            }
            console.error(e.stack)
        } finally {
            convertBtn.disabled = false;
            appendLogRecord('转换结束');
            progressView.style.display = 'none';
        }
    });
})