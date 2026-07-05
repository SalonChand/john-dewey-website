$repo = "https://github.com/SalonChand/john-dewey-website.git"

Write-Host ""
Write-Host "John Dewey Website Deploy" -ForegroundColor Cyan
Write-Host "-------------------------"

$required = @("index.html", "style_v2.css", "app.js", "logo.png", "logo-mark.png", "logo-white.png", "logo-mark-white.png", "favicon.png", "favicon-32.png", "favicon-180.png", ".nojekyll")
$missing = $required | Where-Object { -not (Test-Path $_) }
if ($missing) {
    Write-Host "MISSING FILES - fix before deploying:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    Write-Host "Extract the FULL zip into this folder (Extract All, replace files), then rerun."
    exit 1
}
Write-Host "All required files present." -ForegroundColor Green

$gitok = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitok) {
    Write-Host "Git is not installed or not in PATH. Install from https://git-scm.com then rerun." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path ".git")) {
    Write-Host "Setting up git..."
    git init | Out-Null
}

$name = git config user.name
$email = git config user.email
if (-not $name)  { git config user.name  "SalonChand" }
if (-not $email) { git config user.email "salonchand@users.noreply.github.com" }

$hasOrigin = git remote 2>$null | Select-String -Quiet "origin"
if ($hasOrigin) { git remote set-url origin $repo } else { git remote add origin $repo }

git add -A
$stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Update site $stamp" 2>&1 | Out-Null

git branch -M main 2>&1 | Out-Null

Write-Host "Pushing to GitHub..."
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "DEPLOYED." -ForegroundColor Green
    Write-Host "Live in ~1 minute at: https://salonchand.github.io/john-dewey-website/"
    Write-Host "Hard-refresh with Ctrl+Shift+R to see changes."
} else {
    Write-Host ""
    Write-Host "Push failed. Most common causes:" -ForegroundColor Red
    Write-Host "  1. No internet / DNS (test: open github.com in a browser)"
    Write-Host "  2. GitHub login window was cancelled - rerun and sign in"
    Write-Host "  3. Wrong repo URL or no permission"
    Write-Host "Rerun this script after fixing. If it still fails, copy ALL the text above and share it."
}
