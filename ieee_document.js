// 等待页面加载完成
window.addEventListener("load", () => {
  // 使用 MutationObserver 监听目标元素加载
  const observer = new MutationObserver((mutations, obs) => {
    // 查找包含 "Cite This" 文本的按钮
    const citeThisButton = Array.from(document.querySelectorAll("button, a")).find(
      (el) => el.textContent.trim() === "Cite This"
    );

    // 如果找到了 "Cite This" 按钮
    if (citeThisButton) {
      // 停止观察
      obs.disconnect();

      // 确定目标元素，向上查找2到3层，找到符合条件的父级 div
      let targetDiv = citeThisButton.closest("div");
      if (targetDiv) targetDiv = targetDiv.parentElement;
      if (targetDiv) targetDiv = targetDiv.parentElement;

      // 如果找到目标父级元素
      if (targetDiv) {
        // 复制目标父级元素
        const nusDiv = targetDiv.cloneNode(true);

        // 清除 nusDiv 的原始内容
        nusDiv.innerHTML = "";

        // 创建新的 NUS Proxy 按钮容器 div
        const nusButtonContainer = document.createElement("div");

        // 创建 NUS Proxy 按钮
        const nusButton = document.createElement("button");
        nusButton.textContent = "NUS Proxy";

        // 为按钮应用样式
        nusButton.style.marginLeft = "10px";
        nusButton.style.padding = "8px 15px";
        nusButton.style.backgroundColor = "#0073e6";
        nusButton.style.color = "white";
        nusButton.style.border = "none";
        nusButton.style.borderRadius = "5px";
        nusButton.style.cursor = "pointer";
        nusButton.style.fontSize = "14px";
        nusButton.classList.add("xpl-btn-secondary");

        // 添加点击事件，跳转到代理页面
        nusButton.addEventListener("click", () => {
          const currentUrl = window.location.href;
          const proxyUrl = currentUrl.replace(
            "https://ieeexplore.ieee.org/",
            "https://ieeexplore-ieee-org.libproxy1.nus.edu.sg/"
          );
          window.location.href = proxyUrl;
        });

        // 将 NUS Proxy 按钮放入新的容器中
        nusButtonContainer.appendChild(nusButton);

        // 将容器插入到新的 div 中
        nusDiv.appendChild(nusButtonContainer);

        // 将新的 div 插入到原始 "Cite This" div 的后面
        targetDiv.parentNode.insertBefore(nusDiv, targetDiv.nextSibling);
      }
    }
  });

  // 开始观察 body 元素的子树
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
