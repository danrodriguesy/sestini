import renderDepartmentLists from "./renderDepartmentLists";
const html = String.raw;

export default function (sections, sectionIndex, iterationIndex) {

  if (sectionIndex !== 3)
    return html`
      <li class="x-submenu__container__listItem">
        ${renderDepartmentLists(Object.values(sections)[ iterationIndex++ ])}
      </li>
      <li class="x-submenu__container__listItem x-submenu__container__listItem--marginTop">
        ${renderDepartmentLists(Object.values(sections)[ iterationIndex++ ])}
      </li>
    `;

  return html`
      <li class="x-submenu__container__listItem">
        ${renderDepartmentLists(Object.values(sections)[ iterationIndex++ ])}
      </li>
  `
}
