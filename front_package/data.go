package front_package

var data = []byte{}

func FrontZipPackageData() []byte {
	defer func() {
		data = nil
	}()
	return data
}
