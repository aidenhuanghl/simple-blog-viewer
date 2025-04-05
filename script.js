// 获取用来显示帖子的容器
const postsContainer = document.getElementById('posts-container');
const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // API 地址

// 定义一个 async 函数来获取和显示帖子
async function fetchAndDisplayPosts() {
    try {
        // 显示加载状态 (虽然 HTML 里有，但 JS 里再设置一次更保险)
        postsContainer.innerHTML = '<p>正在加载文章...</p>';

        // 使用 fetch 和 await 获取数据
        const response = await fetch(apiUrl);

        // 检查响应
        if (!response.ok) {
            throw new Error(`HTTP 错误! 状态码: ${response.status}`);
        }

        // 解析 JSON 数据 (帖子数组)
        const posts = await response.json();

        // 清空加载提示
        postsContainer.innerHTML = '';

        // 检查是否有帖子数据
        if (posts && posts.length > 0) {
            // 遍历帖子数组
            posts.forEach(post => {
                // 为每个帖子创建一个 HTML 元素
                const postElement = document.createElement('div');
                postElement.classList.add('post'); // 添加 CSS 类方便样式化

                // 设置帖子的内容 (标题和内容主体)
                // 这里只显示部分 body 内容作为预览
                const bodyPreview = post.body.substring(0, 100); // 截取前 100 个字符

                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${bodyPreview}...</p>
                    <small>用户 ID: ${post.userId}, 帖子 ID: ${post.id}</small>
                `;

                // 将创建的帖子元素添加到容器中
                postsContainer.appendChild(postElement);
            });
        } else {
            // 如果没有帖子数据
            postsContainer.innerHTML = '<p>未能加载任何文章。</p>';
        }

    } catch (error) {
        // 捕获并处理错误
        console.error('加载文章时出错:', error);
        // 在页面上显示错误信息
        postsContainer.innerHTML = `<p style="color: red;">加载文章失败: ${error.message}</p>`;
    }
}

// 页面加载完成后立即调用函数，开始获取数据
fetchAndDisplayPosts();