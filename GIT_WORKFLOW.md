# 🔄 Git Workflow Guide - Sync giữa 2 máy

## 📦 Aliases đã được setup

Mình đã tạo sẵn các Git shortcuts để cậu làm việc nhanh hơn:

### 1. `git sync` - Kéo code mới và cài dependencies
```bash
git sync
```
**Tương đương với:**
```bash
git pull
npm install
```

### 2. `git save "<message>"` - Lưu và đẩy code lên nhanh
```bash
git save "fix: button animation"
```
**Tương đương với:**
```bash
git add .
git commit -m "fix: button animation"
git push
```

### 3. `git s` - Xem trạng thái ngắn gọn
```bash
git s
```
**Tương đương với:**
```bash
git status -sb
```

### 4. `git undo` - Hoàn tác commit cuối (giữ lại code)
```bash
git undo
```
**Tương đương với:**
```bash
git reset --soft HEAD~1
```

### 5. `git last` - Xem commit cuối cùng
```bash
git last
```

---

## 🚀 Workflow Chuẩn

### **Trên Máy A (khi làm xong):**

```bash
# Bước 1: Kiểm tra những gì đã thay đổi
git s

# Bước 2: Lưu và đẩy code lên
git save "feat: add new animation to hero section"
```

### **Trên Máy B (khi bắt đầu làm):**

```bash
# Bước 1: Kéo code mới và cập nhật dependencies
git sync

# Bước 2: Bắt đầu code ngay!
```

---

## 📝 Ví dụ Thực Tế

### Scenario 1: Làm xong trên Máy A
```bash
cd "d:\test\OneDrive\Documents\Máy tính\Motionry"
git s                                          # Xem có gì thay đổi
git save "feat: improve button hover effect"  # Lưu và push
```

### Scenario 2: Chuyển sang Máy B
```bash
cd "d:\test\OneDrive\Documents\Máy tính\Motionry"
git sync                                       # Kéo code + cài dependencies
npm run dev                                    # Chạy project
```

### Scenario 3: Commit nhầm, muốn sửa message
```bash
git undo                                       # Hoàn tác commit (giữ code)
git save "fix: correct commit message"        # Commit lại với message mới
```

---

## ⚠️ Lưu Ý Quan Trọng

### ✅ LUÔN LUÔN:
- **Trước khi chuyển máy**: `git save "..."`
- **Khi bắt đầu làm**: `git sync`
- **Kiểm tra status**: `git s` trước khi commit

### ❌ TRÁNH:
- Quên commit trước khi tắt máy
- Sửa code trên 2 máy cùng lúc (sẽ bị conflict)
- Push code chưa test

---

## 🔧 Setup Alias trên Máy Thứ 2

Khi sang máy khác, các alias này chỉ hoạt động trong project này. Để setup cho toàn bộ máy:

```bash
# Chạy các lệnh này trên máy mới:
git config --global alias.sync '!git pull && npm install'
git config --global alias.save '!f() { git add . && git commit -m "$1" && git push; }; f'
git config --global alias.s 'status -sb'
git config --global alias.undo 'reset --soft HEAD~1'
git config --global alias.last 'log -1 HEAD --stat'
```

Hoặc đơn giản hơn, copy file `.git/config` từ máy này sang máy kia!

---

## 📞 Troubleshooting

### Problem: `git sync` báo conflict
```bash
git stash              # Tạm cất code đang làm
git sync               # Kéo code mới
git stash pop          # Lấy lại code và merge
```

### Problem: Quên commit trên máy A
```bash
# Trên máy B (nơi có code cũ):
git stash              # Cất code hiện tại
git sync               # Kéo code từ máy A
git stash pop          # Merge code của máy B vào
```

---

**Happy Coding! 🎉**
