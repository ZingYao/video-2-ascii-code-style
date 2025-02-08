package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os/exec"
	"runtime"
	"time"
)

// 打包前端静态文件到可执行程序中
//
//go:embed front/dist/*
var staticFiles embed.FS

func main() {
	subFS, err := fs.Sub(staticFiles, "front/dist")
	if err != nil {
		log.Fatalf("获取子文件系统失败:%v", err)
		return
	}
	// 启动服务
	http.Handle("/", http.FileServer(http.FS(subFS)))
	port := 8080
	if IsPortInUse(port) {
		port, err = GetRandomAvailablePort()
		if err != nil {
			log.Fatalf("获取可用端口失败:%v", err)
			return
		}
	}
	go func() {
		time.Sleep(3 * time.Second)
		serviceUrl := fmt.Sprintf("http://127.0.0.1:%d", port)
		log.Printf("服务已启动到8080端口:%s", serviceUrl)
		launchBrowser(serviceUrl)
		// 打开浏览器
	}()
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatalf("启动服务失败:%v", err)
		return
	}
}

func launchBrowser(url string) {
	// 打开浏览器
	switch runtime.GOOS {
	case "linux":
		// 执行命令打开浏览器
		cmd := exec.Command("xdg-open", url)
		err := cmd.Start()
		if err != nil {
			log.Printf("打开浏览器失败:%v,请自行打开浏览器进行访问", err)
		}
	case "windows":
		// 执行命令打开浏览器
		cmd := exec.Command("cmd", "/c", "start", url)
		err := cmd.Start()
		if err != nil {
			log.Printf("打开浏览器失败:%v,请自行打开浏览器进行访问", err)
		}
	case "darwin":
		// 执行命令打开浏览器
		cmd := exec.Command("open", url)
		err := cmd.Start()
		if err != nil {
			log.Printf("打开浏览器失败:%v,请自行打开浏览器进行访问", err)
		}
	default:
		// 不支持的操作系统
		log.Println("自行打开浏览器进行访问")
	}
}

// IsPortInUse 检查指定端口是否被占用
func IsPortInUse(port int) bool {
	address := fmt.Sprintf(":%d", port)
	// 尝试在指定端口上启动TCP监听
	listener, err := net.Listen("tcp", address)
	if err != nil {
		// 监听失败，说明端口已被占用
		return true
	}
	// 监听成功，关闭监听以释放端口
	listener.Close()
	return false
}

func GetRandomAvailablePort() (int, error) {
	// 监听本地地址的随机端口
	listener, err := net.Listen("tcp", ":0")
	if err != nil {
		return 0, err
	}
	// 获取监听地址
	address := listener.Addr().(*net.TCPAddr)
	// 关闭监听以释放端口
	listener.Close()
	return address.Port, nil
}
