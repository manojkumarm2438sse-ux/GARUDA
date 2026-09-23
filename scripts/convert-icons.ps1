Add-Type -AssemblyName System.Drawing
$rootPath = (Resolve-Path "$PSScriptRoot\..").Path
$jpgPath = [System.IO.Path]::Combine($rootPath, "assets", "icons", "garuda_icon.jpg")
$img = [System.Drawing.Image]::FromFile($jpgPath)

# 512x512 PNG
$bmp512 = New-Object System.Drawing.Bitmap(512, 512)
$g512 = [System.Drawing.Graphics]::FromImage($bmp512)
$g512.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g512.DrawImage($img, 0, 0, 512, 512)
$out512 = [System.IO.Path]::Combine($rootPath, "assets", "icons", "icon-512.png")
$bmp512.Save($out512, [System.Drawing.Imaging.ImageFormat]::Png)
$g512.Dispose()
$bmp512.Dispose()

# 192x192 PNG
$bmp192 = New-Object System.Drawing.Bitmap(192, 192)
$g192 = [System.Drawing.Graphics]::FromImage($bmp192)
$g192.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g192.DrawImage($img, 0, 0, 192, 192)
$out192 = [System.IO.Path]::Combine($rootPath, "assets", "icons", "icon-192.png")
$bmp192.Save($out192, [System.Drawing.Imaging.ImageFormat]::Png)
$g192.Dispose()
$bmp192.Dispose()

$img.Dispose()
Write-Host "PNG icons generated successfully:"
Get-Item "$rootPath\assets\icons\*.png" | Select-Object Name, Length
