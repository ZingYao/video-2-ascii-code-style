Write-Output "Building program startup..."
Write-Output "Building frontend..."
Set-Location front
Remove-Item -Path .\dist -Recurse -Force
npm run build
Write-Output "Frontend build complete."


Set-Location ..
Write-Output "Building launcher..."

# 构建 Windows 平台
Write-Output "Building Windows launcher..."
$env:GOOS = "windows"
$architectures = @("386", "amd64", "arm", "arm64")
foreach ($arch in $architectures) {
    Write-Output "Building $arch..."
    $env:GOARCH = $arch
    go build -o "bin/launcher_windows_${arch}.exe" -ldflags "-s -w"
    Write-Output "Windows $arch build complete."
}
Write-Output "Windows launcher build complete."

# 构建 Linux 平台
Write-Output "Building Linux launcher..."
$env:GOOS = "linux"
$architectures = @("386", "amd64", "arm", "arm64","ppc64","ppc64le","mips","mipsle","mips64","mips64le","s390x")
foreach ($arch in $architectures) {
    Write-Output "Building $arch..."
    $env:GOARCH = $arch
    go build -o "bin/launcher_linux_${arch}" -ldflags "-s -w"
    Write-Output "Linux $arch build complete."
}
Write-Output "Linux launcher build complete."

# 构建 MacOS 平台
Write-Output "Building MacOS launcher..."
$env:GOOS = "darwin"
$architectures = @( "amd64", "arm64")
foreach ($arch in $architectures) {
    Write-Output "Building $arch..."
    $env:GOARCH = $arch
    go build -o "bin/launcher_darwin_${arch}" -ldflags "-s -w"
    Write-Output "MacOS $arch build complete."
}
Write-Output "MacOS launcher build complete."

# 构建 Android 平台
Write-Output "Building Android launcher..."
$env:GOOS = "android"
$architectures = @("386", "amd64", "arm", "arm64")
foreach ($arch in $architectures) {
    Write-Output "Building $arch..."
    $env:GOARCH = $arch
    go build -o "bin/launcher_android_${arch}" -ldflags "-s -w"
    Write-Output "Android $arch build complete."
}
Write-Output "Android launcher build complete."

Write-Output "All launcher build complete."