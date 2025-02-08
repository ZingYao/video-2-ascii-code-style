package front_package

import (
	"archive/zip"
	"bytes"
	"fmt"
	"log"
)

func Unpack() (map[string][]byte, error) {
	frontPack := FrontZipPackageData()
	r, err := zip.NewReader(bytes.NewReader(frontPack), int64(len(frontPack)))
	if err != nil {
		log.Printf("解压缩前端包出错:%v", err)
		return nil, err
	}
	frontFiles := make(map[string][]byte)
	for _, f := range r.File {
		fmt.Println(f)
	}
	return frontFiles, nil
}
