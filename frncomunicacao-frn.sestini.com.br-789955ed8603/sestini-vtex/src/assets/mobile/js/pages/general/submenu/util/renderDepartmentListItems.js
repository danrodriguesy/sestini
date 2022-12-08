export default function (content, willRenderImage = false) {
  const html = String.raw;
  let htmlContent = "";

  Object.values(content).forEach((item) => {
    if (item.imgSrc && willRenderImage) {
      const [ itemName, imgSrc, url ] = Object.values(item);
      htmlContent += html`
        <li class="x-submenu__department__item x-submenu__department__item--${itemName}">
          <a class="x-submenu__department__item__link" href="${url}">
            <div class="x-submenu__imgWrapper">
              <img src="${imgSrc}" alt="${itemName}" />
            </div>
            <div class="x-submenu__linkLabel">${itemName}</div>
          </a>
        </li>
      `;
      return htmlContent;
    }

    if (item.hexCode) {
      const [ itemName, hexCode, url ] = Object.values(item);

      htmlContent += `
    <li class="x-submenu__department__item--color x-submenu__department__item--${itemName}" >
      <a href="${url}">
        <div class="colorImg" style="background: ${hexCode}"></div>
        ${itemName}
      </a>
    </li >
  `;

      return htmlContent;
    }

    if (item.imgSrc) {
      const [ itemName, _, url ] = Object.values(item);
      htmlContent += html`
      <li class="x-submenu__department__item--${itemName}">
        <a href="${url}">${itemName}</a>
      </li>
    `;

      return htmlContent

    }
    const [ itemName, url ] = Object.values(item);
    console.log("DEBUG:::: ", Object.values(item))
    htmlContent += html`
      <li class="x-submenu__department__item--${itemName}">
        <a href="${url}">${itemName}</a>
      </li>
    `;
  });
  return htmlContent;
}
