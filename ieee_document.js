// 等待页面加载完成
window.addEventListener("load", () => {
  // 使用 MutationObserver 监听页面变化
  const observer = new MutationObserver((mutations, obs) => {
    // 查找下载 PDF 按钮和工具提示 div
    const downloadButton = document.querySelector("a[href*='/document/']");
    const tooltipDiv = document.querySelector("div.black-tooltip.tool-tip-pdf-button");
    
    if (downloadButton && tooltipDiv) {
      // 停止观察，因为已经找到元素
      obs.disconnect();

      // 定义代理 URL 模式
      const proxyUrlPatterns = {
        "https://ieeexplore.ieee.org/document/": "https://ieeexplore-ieee-org.libproxy1.nus.edu.sg/document/"
      };

      // 创建按钮并插入到工具提示 div 后面
      const nusButton = document.createElement("button");
      nusButton.textContent = "NUS Proxy";
      nusButton.classList.add("nus-proxy-button");

      // 添加点击事件，跳转到代理页面
      nusButton.addEventListener("click", (event) => {
        event.preventDefault();  // 阻止默认刷新行为

        // 生成代理 URL 并在新标签页打开
        let proxyUrl = downloadButton.href;
        for (const [pattern, replacement] of Object.entries(proxyUrlPatterns)) {
          proxyUrl = proxyUrl.replace(pattern, replacement);
        }
        window.open(proxyUrl, "_blank");
      });

      // 将按钮插入到工具提示 div 后面
      tooltipDiv.parentElement.insertBefore(nusButton, tooltipDiv.nextSibling);
    }
  });

  // 开始观察页面的子树变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
