# Git Alias Setup Script
# Chạy script này trên máy mới để có ngay các alias

Write-Host "🚀 Setting up Git aliases..." -ForegroundColor Cyan

git config --global alias.sync '!git pull && npm install'
git config --global alias.save '!f() { git add . && git commit -m "$1" && git push; }; f'
git config --global alias.s 'status -sb'
git config --global alias.undo 'reset --soft HEAD~1'
git config --global alias.last 'log -1 HEAD --stat'

Write-Host "✅ Git aliases installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Yellow
Write-Host "  git sync          - Pull code + install dependencies"
Write-Host "  git save 'msg'    - Add + Commit + Push"
Write-Host "  git s             - Short status"
Write-Host "  git undo          - Undo last commit (keep changes)"
Write-Host "  git last          - Show last commit"
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Magenta
