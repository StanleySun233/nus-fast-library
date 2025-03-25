function createNusProxyButton(linkElement, proxyUrlPatterns) {
  // 确保没有重复添加按钮
  if (linkElement.parentElement.querySelector(".nus-proxy-button")) return;

  // 创建新的 NUS Proxy 按钮
  const nusButton = document.createElement("button");
  nusButton.textContent = "NUS Proxy";
  nusButton.classList.add("nus-proxy-button");

  // 添加点击事件，跳转到代理页面
  nusButton.addEventListener("click", (event) => {
    event.preventDefault();  // 阻止默认刷新行为

    // 生成代理 URL 并在新标签页打开
    let proxyUrl = linkElement.href;
    for (const [pattern, replacement] of Object.entries(proxyUrlPatterns)) {
      proxyUrl = proxyUrl.replace(pattern, replacement);
    }
    window.open(proxyUrl, "_blank");
  });

  // 将按钮插入到 a 标签后面
  linkElement.parentElement.insertBefore(nusButton, linkElement.nextSibling);
} 