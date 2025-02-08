#!/bin/bash

echo "Building program startup..."
echo "Building frontend..."
cd front
rm -rf dist
npm run build
echo "Frontend build complete."

cd ..
echo "Building launcher..."

# 构建 Windows 平台
echo "Building Windows launcher..."
GOOS=windows
architectures=("386" "amd64" "arm" "arm64")
for arch in "${architectures[@]}"; do
    echo "Building $arch..."
    GOARCH=$arch
    go build -o "bin/launcher_windows_${arch}.exe" -ldflags "-s -w"
    echo "Windows $arch build complete."
done

# 构建 Linux 平台
echo "Building Linux launcher..."
GOOS=linux
architectures=("386" "amd64" "arm" "arm64" "ppc" "ppc64" "mips" "mips64" "mips64le" "mipsle" "s390x")
for arch in "${architectures[@]}"; do
    echo "Building $arch..."
    GOARCH=$arch
    go build -o "bin/launcher_linux_${arch}" -ldflags "-s -w"
    echo "Linux $arch build complete."
done

# 构建 macOS 平台
echo "Building macOS launcher..."
GOOS=darwin
architectures=("amd64" "arm64")
for arch in "${architectures[@]}"; do
    echo "Building $arch..."
    GOARCH=$arch
    go build -o "bin/launcher_macos_${arch}" -ldflags "-s -w"
    echo "macOS $arch build complete."
done

# 构建 Android 平台
echo "Building Android launcher..."
GOOS=android
architectures=("arm" "arm64" "386" "amd64")
for arch in "${architectures[@]}"; do
    echo "Building $arch..."
    GOARCH=$arch
    go build -o "bin/launcher_android_${arch}" -ldflags "-s -w"
    echo "Android $arch build complete."
done

echo "All builds complete."
