# api-DoRa

🚀 Alur Kerja Branching
Kami menggunakan alur kerja GitFlow yang disederhanakan untuk mengelola pengembangan fitur dan perbaikan bug. Branch main harus selalu bersih dan stabil.

Branch Utama
main: Branch ini berisi kode yang sudah diuji, stabil, dan siap untuk rilis produksi. Jangan pernah melakukan commit langsung ke branch ini. Semua perubahan harus datang dari branch lain melalui Pull Request (PR) setelah melalui proses review.

dev (Development): Branch ini adalah branch utama untuk pengembangan. Semua fitur baru dan perbaikan bug harus digabungkan (merge) ke branch ini terlebih dahulu. Branch dev mungkin tidak selalu stabil karena merupakan tempat pengujian integrasi.

Branch Fitur dan Perbaikan
feat/nama-fitur-baru: Gunakan branch ini untuk pengembangan fitur baru.

fix/perbaikan-bug: Gunakan branch ini untuk memperbaiki bug.