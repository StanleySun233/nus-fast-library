// 等待页面加载完成并延时执行
window.addEventListener("load", () => {
  setTimeout(() => {
    // 使用 MutationObserver 监听页面的动态加载
    const observer = new MutationObserver((mutations, obs) => {
      // 查找所有 class 为 operate-btn 的 ul 标签
      const operateBtnLists = document.querySelectorAll("ul.operate-btn");

      if (operateBtnLists.length > 0) {
        // 停止观察，因为已经找到元素
        obs.disconnect();

        operateBtnLists.forEach((ulElement) => {
          // 确保没有重复添加按钮
          if (ulElement.querySelector(".nus-proxy-link")) return;

          // 创建新的 li 元素
          const liElement = document.createElement("li");
          liElement.classList.add("btn-html"); // 添加类名使其样式匹配

          // 创建新的 a 标签作为代理按钮
          const nusLink = document.createElement("a");
          nusLink.textContent = "NUS Proxy";
          nusLink.target = "_blank";
          nusLink.classList.add("nus-proxy-link");

          // 为 a 标签设置跳转链接
          nusLink.href = window.location.href.replace(
            "https://chn.oversea.cnki.net/",
            "https://chn-oversea-cnki-net.libproxy1.nus.edu.sg/"
          ).replace(
            "https://cnki.net/",
            "https://chn-oversea-cnki-net.libproxy1.nus.edu.sg/"
          );

          // 创建一个空的 i 标签以符合样式
          const icon = document.createElement("i");
          nusLink.prepend(icon); // 将 i 标签放入 a 标签内

          // 将 a 标签插入到 li 中
          liElement.appendChild(nusLink);

          // 将新的 li 插入到 ul 的子级末尾
          ulElement.appendChild(liElement);
        });
      }
    });

    // 开始观察 body 元素的子树变化
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }, 500); // 延时 500 毫秒
});
