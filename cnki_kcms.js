// 等待页面加载完成
window.addEventListener("load", () => {
  // 使用 MutationObserver 监听页面变化
  const observer = new MutationObserver((mutations, obs) => {
    // 查找目标 li 元素
    const targetLi = document.querySelector("li.btn-download");
    
    if (targetLi) {
      // 停止观察，因为已经找到元素
      obs.disconnect();

      // 定义代理 URL 模式
      const proxyUrlPatterns = {
        "https://chn.oversea.cnki.net/kcms/": "https://chn-oversea-cnki-net.libproxy1.nus.edu.sg/kcms/",
        "https://cnki.net/kcms/": "https://chn-oversea-cnki-net.libproxy1.nus.edu.sg/kcms/"
      };

      // 创建按钮并插入到目标 li 后面
      const nusButton = document.createElement("button");
      nusButton.textContent = "NUS Proxy";
      nusButton.classList.add("nus-proxy-button");

      // 添加点击事件，跳转到代理页面
      nusButton.addEventListener("click", (event) => {
        event.preventDefault();  // 阻止默认刷新行为

        // 生成代理 URL 并在新标签页打开
        let proxyUrl = window.location.href;
        for (const [pattern, replacement] of Object.entries(proxyUrlPatterns)) {
          proxyUrl = proxyUrl.replace(pattern, replacement);
        }
        window.open(proxyUrl, "_blank");
      });

      // 将按钮插入到目标 li 后面
      targetLi.parentElement.insertBefore(nusButton, targetLi.nextSibling);
    }
  });

  // 开始观察页面的子树变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
