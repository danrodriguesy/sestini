import renderDepartmentListItems from "./renderDepartmentListItems";

export default function (department, isRow = false, hasIcon = false) {
  if (!department) return;
  const html = String.raw;
  let htmlContent = "";

  const { title, content } = department;

  const renderCategoryTitle = () => {
    if (!department.categoryTitle) return "";
    return `<div class="x-submenu__department__heading x-submenu__department__headingCategory">${department.categoryTitle}</div>`;
  };

  htmlContent += html`
    ${renderCategoryTitle()}
    <div
      class="x-submenu__department__heading ${hasIcon &&
      "x-submenu__department__heading--gray"}"
    >
      ${title}
    </div>
    <ul
      class="x-submenu__department__list ${hasIcon &&
      "x-submenu__department__list--gray"} x-submenu__department__list--${Object.values(
        department
      )[department.categoryTitle ? 1 : 0].replace(/ /g, "-")} ${isRow && " flex--row"}"
    >
      ${renderDepartmentListItems(content, hasIcon)}
    </ul>
  `;
  return htmlContent;

}