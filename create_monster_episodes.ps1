$sourceFile = "MonsterEp1.html"
$baseDir = "C:\Users\jordi\Documents\GitHub\JoJo-Flix\Content\Monster"

for ($i = 2; $i -le 74; $i++) {
    $destFile = "MonsterEp$i.html"
    $fullPath = Join-Path -Path $baseDir -ChildPath $destFile
    
    Copy-Item -Path (Join-Path -Path $baseDir -ChildPath $sourceFile) -Destination $fullPath
    
    Write-Host "Created: $destFile"
}

Write-Host "Process completed. 73 new files created."