// 等待页面加载完成
window.addEventListener("load", () => {
  // 使用 MutationObserver 监听搜索结果的加载
  const observer = new MutationObserver((mutations, obs) => {
    // 查找符合条件的 a 标签
    const articleLinks = document.querySelectorAll("a.fz14[href*='/kns/Detail']");

    if (articleLinks.length > 0) {
      // 停止观察，因为已经找到元素
      obs.disconnect();

      // 定义代理 URL 模式
      const proxyUrlPatterns = {
        "https://chn.oversea.cnki.net/kns/Detail?": "https://chn-oversea-cnki-net.libproxy1.nus.edu.sg/kcms/detail/detail.aspx?",
        "https://cnki.net/kns/Detail?": "https://chn-oversea-cnki-net.libproxy1.nus.edu.sg/kcms/detail/detail.aspx?",
        "https://www.cnki.net": "https://chn-oversea-cnki-net.libproxy1.nus.edu.sg/kcms/detail/detail.aspx?"
      };

      articleLinks.forEach((linkElement) => {
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
