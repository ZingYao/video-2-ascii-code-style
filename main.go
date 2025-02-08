package video_2_ascii_code_style

import "flag"

var programMode = flag.String("m", "r", "program run mode \n r: run \n b: build front package")

func main() {
	flag.Parse()
	if *programMode == "r" {
		run()
	} else if *programMode == "b" {
		build()
	}
}

func run() {
	// 解压前端文件

}

func build() {
	// 打包前端文件
}
