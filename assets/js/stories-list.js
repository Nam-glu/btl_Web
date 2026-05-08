// 1. KHAI BÁO CẤU HÌNH
const API_STORIES = "http://localhost:3000/stories";

/**
 * Hàm lấy danh sách truyện từ JSON Server và hiển thị lên giao diện
 */
async function loadStories() {
    console.log("Đang tải dữ liệu từ db.json...");
    
    try {
        // Gửi yêu cầu lấy dữ liệu
        const response = await fetch(API_STORIES);
        
        if (!response.ok) {
            throw new Error("Không thể kết nối tới server!");
        }

        const stories = await response.json();
        const storyListContainer = document.getElementById('storyList');

        if (!storyListContainer) {
            console.error("Lỗi: Không tìm thấy thẻ HTML có id='storyList'");
            return;
        }

        // Xóa nội dung cũ trước khi đổ mới
        storyListContainer.innerHTML = "";

        // Duyệt qua từng bộ truyện để tạo HTML
        let htmlContent = "";
        stories.forEach(story => {
            const isFree = story.price === 0;
            // Chú ý: Dùng displayPrice đồng nhất từ trên xuống dưới
            const displayPrice = isFree ? "Miễn phí" : `${story.price.toLocaleString()}đ`;
            const priceClass = isFree ? "price-free" : "price-paid";

            htmlContent += `
                <div class="story-item" onclick="handleStoryClick('${story.id}')">
                    <div class="story-img-container">
                        <img 
                            src="${story.thumbnail}" 
                            class="story-img" 
                            alt="${story.title}"
                            onerror="this.onerror=null; this.src='assets/img/logo.png'"
                        >
                    </div>
                    <div class="story-info">
                        <h3 class="story-title">${story.title}</h3>
                        <div class="price-display ${priceClass}">
                            ${displayPrice}
                        </div>
                    </div>
                </div>
            `;
        });

        // Đổ toàn bộ HTML vào container
        storyListContainer.innerHTML = htmlContent;
        console.log("Đã hiển thị " + stories.length + " truyện.");

    } catch (error) {
        console.error("Lỗi khi tải truyện:", error);
        const storyListContainer = document.getElementById('storyList');
        if (storyListContainer) {
            storyListContainer.innerHTML = `<p style="color: red; text-align: center;">Lỗi: Hãy chắc chắn bạn đã chạy 'json-server --watch db.json'</p>`;
        }
    }
}

/**
 * Xử lý sự kiện khi người dùng nhấn vào một bộ truyện
 */
function handleStoryClick(storyId) {
    console.log("Bạn đã chọn truyện có ID:", storyId);
    // Tại đây bạn có thể mở Modal hoặc chuyển trang chi tiết
    // Ví dụ: window.location.href = `detail.html?id=${storyId}`;
}

// 2. KÍCH HOẠT KHI TRANG LOAD XONG
document.addEventListener('DOMContentLoaded', () => {
    loadStories();
});