// 等待页面加载完成
window.addEventListener("load", () => {
  // 使用 MutationObserver 监听搜索结果的加载
  const observer = new MutationObserver((mutations, obs) => {
    // 查找带有 fw-bold 类的搜索结果链接
    const searchLinks = document.querySelectorAll("a.fw-bold[href*='/document/']");
    
    if (searchLinks.length > 0) {
      // 停止观察，因为已经找到元素
      obs.disconnect();

      // 定义代理 URL 模式
      const proxyUrlPatterns = {
        "https://ieeexplore.ieee.org/document/": "https://ieeexplore-ieee-org.libproxy1.nus.edu.sg/document/"
      };

      searchLinks.forEach((linkElement) => {
        createNusProxyButton(linkElement, proxyUrlPatterns);
      });
    }
  });

  // 开始观察页面的子树变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
