import renderDepartmentLists from "./renderDepartmentLists";

export default function (sectionsToRender) {
  let htmlContent = "";
  const html = String.raw;

  sectionsToRender.map((section) => {
    htmlContent += html`
      <li class="x-submenu__container__listItem">
        ${renderDepartmentLists(section, true, true)}
      </li>
    `;
  });

  return htmlContent;
}