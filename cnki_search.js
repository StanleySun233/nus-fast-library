// 等待页面加载完成
window.addEventListener("load", () => {
  // 使用 MutationObserver 监听搜索结果的加载
  const observer = new MutationObserver((mutations, obs) => {
    // 查找符合条件的 a 标签
    const articleLinks = document.querySelectorAll("a.fz14[href*='/kns/Detail']");

    if (articleLinks.length > 0) {
      // 停止观察，因为已经找到元素
      obs.disconnect();

      articleLinks.forEach((linkElement) => {
        // 确保没有重复添加按钮
        if (linkElement.parentElement.querySelector(".nus-proxy-button")) return;

        // 创建新的 NUS Proxy 按钮
        const nusButton = document.createElement("button");
        nusButton.textContent = "NUS Proxy";

        // 为按钮应用样式
        nusButton.style.marginLeft = "10px";
        nusButton.style.padding = "4px 8px";
        nusButton.style.backgroundColor = "#0073e6";
        nusButton.style.color = "white";
        nusButton.style.border = "none";
        nusButton.style.borderRadius = "5px";
        nusButton.style.cursor = "pointer";
        nusButton.style.fontSize = "12px";
        nusButton.classList.add("nus-proxy-button");

        // 添加点击事件，跳转到代理页面
        nusButton.addEventListener("click", (event) => {
          event.preventDefault();  // 阻止默认刷新行为

          // 生成代理 URL 并在新标签页打开
          const articleUrl = linkElement.href;
          const proxyUrl = articleUrl.replace(
            "https://chn.oversea.cnki.net/kns/Detail?",
            "https://chn-oversea-cnki-net.libproxy1.nus.edu.sg/kcms/detail/detail.aspx?"
          ).replace(
            "https://cnki.net/kns/Detail?",
            "https://chn-oversea-cnki-net.libproxy1.nus.edu.sg/kcms/detail/detail.aspx?"
          );
          window.open(proxyUrl, "_blank");
        });

        // 将按钮插入到 a 标签后面
        linkElement.parentElement.insertBefore(nusButton, linkElement.nextSibling);
      });
    }
  });

  // 开始观察页面的子树变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
